import {BootstrapServiceConfiguration} from "./autoloader/loader.decorator";
import {IBootstrapConfiguration} from "./autoloader/loader.interface";
import {ClientOptions, GrpcOptions, Transport} from "@nestjs/microservices";
import * as Config from "config";
import {join as pathJoin} from "path";

@BootstrapServiceConfiguration("core-service")
export class DefaultConfiguration implements IBootstrapConfiguration<ClientOptions> {

    async getConfiguration(): Promise<GrpcOptions> {

        const serviceConfig = Config.get("services") as {[key: string]: string|number|object};
        const defaultService = serviceConfig.default as {[key: string]: string|number|object};

        const host = String(defaultService.host);
        const port = Number(defaultService.port);
        const pkg = String(defaultService.proto_package_name);
        const path = String(defaultService.proto_file_root);
        const file = String(defaultService.proto_file_path);

        console.log(pathJoin(process.env.NODE_PATH as string, path), pkg, file);

        return {
            transport: Transport.GRPC,
            options: {
                url: `${host}:${port}`,
                protoPath: file,
                package: pkg,
                loader: {
                    includeDirs: [
                        pathJoin(process.env.NODE_PATH as string, path),
                    ],
                    bytes: Array,
                    longs: String,
                    keepCase: true,
                }
            }
        };

    }

}