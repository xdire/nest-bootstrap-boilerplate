export interface IStaticBootstrapServiceConfiguration<T> {
    new(...args: any): IBootstrapServiceConfiguration<T>;
}

export interface IBootstrapServiceConfiguration<T> {
    getConfiguration(): Promise<IBootstrapOptions<T>> | IBootstrapOptions<T>;
}

export interface IBootstrapOptions<T extends IKeyValueOptions> {

}

export interface IKeyValueOptions {
    [key: string] : any;
}

export interface IConfigurationToResolve {
   name: string;
   object: IStaticBootstrapServiceConfiguration<any>;
}

export interface ILoaderServiceEventMessage {
    kind: LoaderServiceEventKind,
    type: LoaderServiceEventType,
    configurations?: number,
    message: string
}

export enum LoaderServiceEventType {
    SUCCESS,
    ERROR
}

export enum LoaderServiceEventKind {
    LOAD_ALL,
    LOAD_SINGLE
}