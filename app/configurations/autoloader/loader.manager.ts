import {Observable, Subject} from "rxjs";
import {
    IBootstrapOptions,
    IConfigurationToResolve,
    ILoaderServiceEventMessage,
    LoaderServiceEventKind,
    LoaderServiceEventType,
} from "./loader.interface";
import * as FS from "fs";
import * as Path from "path";

export class LoaderManager {
    // Static properties
    private static _instance: LoaderManager|null = null;
    // Instance properties
    private _publisher: Subject<ILoaderServiceEventMessage> = new Subject();
    readonly _events: Observable<ILoaderServiceEventMessage>;
    private _resolve: IConfigurationToResolve[] = [];
    private _resolved: Map<string, any> = new Map<string, IBootstrapOptions<any>>();
    private _addedItems: number = 0;
    private _resolvedItems: number = 0;
    private _awaitForRegistrationMs = 500;
    private _resolveIn: string = "../";

    /**
     * Provide class/object with configuration function resolving a particular
     * configuration
     * --------------------------------------------------------------------
     * @param configuration
     */
    public static addConfiguration(configuration: IConfigurationToResolve) {
        LoaderManager.createInstance();
        if (LoaderManager._instance) {
            const instance: LoaderManager = LoaderManager._instance;
            instance._resolve.push(configuration);
            instance._addedItems++;
            console.log("Added: ", configuration);
            setTimeout(() => {
                instance.resolve();
            }, instance._awaitForRegistrationMs);
        }
    }

    /**
     * Get Configuration for some name
     * --------------------------------------------------------------------
     * @param name
     */
    public static getConfiguration<T>(name: string): T | null {
        if (LoaderManager._instance) {
            if (LoaderManager._instance._resolved.has(name)) {
                return LoaderManager._instance._resolved.get(name);
            }
        }
        return null;
    }

    /**
     * Start resolution of configurations added with specific decorator
     * --------------------------------------------------------------------
     * @param dirPath
     */
    public static resolveConfigurations(dirPath?: string) {
        LoaderManager.createInstance();
        if (LoaderManager._instance) {
            LoaderManager._instance.loadAllFromFolder(dirPath);
        }
    }

    public static events(): Observable<ILoaderServiceEventMessage> {
        LoaderManager.createInstance();
        if (LoaderManager._instance) {
            return LoaderManager._instance._events;
        }
        throw new Error("Cannot provide events object");
    }

    private static createInstance() {
        if (LoaderManager._instance === null) {
            LoaderManager._instance = new LoaderManager();
        }
    }

    constructor() {
        this._events = this._publisher.asObservable();
    }

    /**
     * Will start to resolve all of the items in a queue
     * --------------------------------------------------------------------
     */
    public resolve() {
        for (const toResolve of this._resolve) {
            // Check for name
            const name = toResolve.name;
            // Check if it is a class
            if (typeof toResolve.object.constructor !== "undefined") {
                // Create instance
                const instance = new toResolve.object();
                // If Promise or AsyncFunction
                if (instance.getConfiguration.constructor.name === "AsyncFunction"
                    || (instance.getConfiguration) instanceof Promise) {
                    // Execute promise and archive results after
                    (instance.getConfiguration() as Promise<any>).then(conf => {
                        this._resolved.set(name, conf);
                        this.wrapResolveAndEmitFinalStatus();
                    }).catch(e => {
                        this._publisher.next({
                           kind: LoaderServiceEventKind.LOAD_SINGLE,
                           type: LoaderServiceEventType.ERROR,
                           message: `Cannot load element for name: ${name}. Error: ${e.message}`,
                        });
                        this.wrapResolveAndEmitFinalStatus();
                    });
                }
                // If function
                if (typeof instance.getConfiguration === "function") {
                    this._resolved.set(name, instance.getConfiguration());
                    this.wrapResolveAndEmitFinalStatus();
                }
            }

        }
    }

    /**
     * Will provide loading mechanics to load all of the files with special
     * decorator from some folder
     * --------------------------------------------------------------------
     * @param dirPath
     */
    public loadAllFromFolder(dirPath?: string) {
        // Select proper behavior between relative and absolute paths
        let dir = "";
        if (typeof dirPath === "undefined" || dirPath === null) {
            // Load relative path to this loader
            dir = Path.resolve(__dirname + '/' + this._resolveIn);
        } else {
            // Load Absolute path provided by NODE_PATH
            dir = Path.resolve(process.env.NODE_PATH + '/' + dirPath);
        }
        // Exit from loading any of files if designated path not exists
        if (!FS.existsSync(dir))
            return;
        // Read all filenames from directory into string array
        const files = FS.readdirSync(dir);
        // Traverse filenames one by one and try to load them
        for (const file of files) {
            // Try/Catch if we can load. All rest of process is trusted for typescript loader
            try {
                // Resolve full pathname
                const filePath = Path.resolve(dir + '/' + file);
                // Try dynamic load with catching possible unresolved Promise
                import(filePath).then(cls => {
                    if (typeof cls !== "undefined") {
                        // Yet don't do anything, TODO Add proper event here
                    }
                }).catch(e => {
                    // Ignore everything that was rejected on load stage
                    this._publisher.next({
                        kind: LoaderServiceEventKind.LOAD_SINGLE,
                        type: LoaderServiceEventType.ERROR,
                        message: `Cannot load configuration from file: ${filePath}. Error: ${e.message}`,
                    });
                })
            } catch (e) {
                // Yet don't do anything, TODO Add proper event here
            }
        }
    }

    /**
     * Will try to emit Final status of loading each time as another item
     * is processed
     * --------------------------------------------------------------------
     */
    private wrapResolveAndEmitFinalStatus() {
        // Iterate resolved items
        this._resolvedItems++;
        // Check if resolved is same as added items and then emit
        if (this._addedItems <= this._resolvedItems) {
            this._publisher.next({
                kind: LoaderServiceEventKind.LOAD_ALL,
                type: LoaderServiceEventType.SUCCESS,
                message: "Loader processed all items",
                itemsTotal: this._resolvedItems,
                itemNameList: Array.from(this._resolved.keys())
            })
        }
    }

}