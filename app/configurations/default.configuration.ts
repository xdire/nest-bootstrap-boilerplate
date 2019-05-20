import {BootstrapServiceConfiguration} from "./autoloader/loader.decorator";
import {IBootstrapServiceConfiguration} from "./autoloader/loader.interface";
import {ClientOptions, GrpcOptions, Transport} from "@nestjs/microservices";

@BootstrapServiceConfiguration("service")
export class DefaultConfiguration implements IBootstrapServiceConfiguration<ClientOptions> {

    async getConfiguration(): Promise<GrpcOptions> {
        return {
            transport: Transport.GRPC,
            options: {
                url: "localhost:50051",
                protoPath: "",
                package: "",
                loader: {
                    includeDirs: [

                    ],
                    bytes: Array,
                    longs: String,
                    keepCase: true
                }
            }
        };
    }

}