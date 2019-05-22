import {LoaderManager} from "./configurations/autoloader/loader.manager";
import {LoaderServiceEventKind, LoaderServiceEventType} from "./configurations/autoloader/loader.interface";
import {NestFactory} from "@nestjs/core";
import {CoreModule} from "./modules/core/core.module";
import {GrpcOptions} from "@nestjs/microservices";

LoaderManager.resolveConfigurations();
LoaderManager.events().subscribe(ev => {
    // Check message of type LOAD_ALL in conjunction with SUCCESS
    if (ev.kind === LoaderServiceEventKind.LOAD_ALL
        && ev.type === LoaderServiceEventType.SUCCESS) {
        startServices().then().catch();
    }
});

const startServices = async () => {
    try {
        // Create Nest micro-services
        const app = await NestFactory.create(CoreModule);
        // Collect Core configuration and check it's presence
        const coreConfiguration = LoaderManager.getConfiguration<GrpcOptions>("core-service");
        app.connectMicroservice(coreConfiguration);
        // Start all services connected to this application
        await app.startAllMicroservicesAsync();
    } catch (e) {
        console.error("Cannot start software", e.message);
    }
};
