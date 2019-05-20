import {
    IConfigurationToResolve,
} from "./loader.interface";
import {LoaderManager} from "./loader.manager";

/**
 * Decorator for attach some class with certain interface to a resolution chain
 * ----------------------------------------------------------------------------
 * @param name
 * @constructor
 */
export const BootstrapServiceConfiguration = (name?: string): ClassDecorator => {
    // Expected static class representation of Entity which can provide configuration
    return <IStaticBootstrapServiceConfiguration>(target: IStaticBootstrapServiceConfiguration) => {
        console.log("DECORATOR WORKING!!!");
        // Create object to provide resolution for
        const toResolve: IConfigurationToResolve = {
            name: typeof name !== "undefined" ? name : target.constructor.name,
            object: target as any
        };
        console.log(toResolve);
        // Append configuration to Loader Manager
        LoaderManager.addConfiguration(toResolve);
    }
};
