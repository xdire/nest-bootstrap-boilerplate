export interface IStaticBootstrapConfiguration<T> {
    new(...args: any): IBootstrapConfiguration<T>;
}

export interface IBootstrapConfiguration<T> {
    getConfiguration(): Promise<IBootstrapOptions<T>> | IBootstrapOptions<T>;
}

export interface IBootstrapOptions<T extends IKeyValueOptions> {

}

export interface IKeyValueOptions {
    [key: string] : any;
}

export interface IConfigurationToResolve {
   name: string;
   object: IStaticBootstrapConfiguration<any>;
}

export interface ILoaderServiceEventMessage {
    kind: LoaderServiceEventKind,
    type: LoaderServiceEventType,
    message: string,
    itemsTotal?: number,
    itemNameList?: string[],
}

export enum LoaderServiceEventType {
    SUCCESS,
    ERROR
}

export enum LoaderServiceEventKind {
    LOAD_ALL,
    LOAD_SINGLE
}