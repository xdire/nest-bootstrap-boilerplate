import {BootstrapServiceConfiguration} from "./autoloader/loader.decorator";
import {IBootstrapConfiguration} from "./autoloader/loader.interface";
import * as Config from "config";
import {join as pathJoin} from "path";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConnectionOptions} from "typeorm";

@BootstrapServiceConfiguration("core-database")
export class DefaultDbConfiguration implements IBootstrapConfiguration<TypeOrmModuleOptions> {

    async getConfiguration(): Promise<ConnectionOptions> {
        // Take config parameters for database
        const databaseConfig = Config.get("database") as {[key: string]: string|number|object};
        const options = databaseConfig.default as {[key: string]: string|number|object};
        // Return type of TypeOrmModuleOptions
        return {
            type: (String(options.type) as any),
            host: String(options.host),
            port: Number(options.port),
            username: String(options.user),
            password: String(options.password),
            database: String(options.database),
            entities: [
                pathJoin(process.env.NODE_PATH + "/modules/**/*.model{.ts,.js}"),
            ],
            synchronize: true,
            // migrationsRun: true,
            // migrationsTableName: "custom_migration_table",
            // migrations: [pathJoin(process.env.NODE_PATH + "/migrations/**/*{.ts,.js}")],
            // cli: {
            //     migrationsDir: "app/migrations"
            // }
        };
    }

}

