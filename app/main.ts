import {LoaderManager} from "./configurations/autoloader/loader.manager";
import {LoaderServiceEventKind, LoaderServiceEventType} from "./configurations/autoloader/loader.interface";

LoaderManager.resolveConfigurations();
LoaderManager.events().subscribe(ev => {

    console.log("EVENT HAPPENED ON LOAD MANAGER", ev);

    if (ev.kind === LoaderServiceEventKind.LOAD_ALL && ev.type === LoaderServiceEventType.SUCCESS) {
        console.log("All loaded successfully");
    }

});

setTimeout(() => {
    console.log(LoaderManager.getConfiguration("service"));
}, 5000);