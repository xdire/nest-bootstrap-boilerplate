import {join as pathJoin} from "path";
import * as Config from "config";

const databaseConfig = Config.get("database") as {[key: string]: string|number|object};
const options = databaseConfig.default as {[key: string]: string|number|object};
// Return type of TypeOrmModuleOptions
const config =  {
    type: (String(options.type) as any),
    host: String(options.host),
    port: Number(options.port),
    username: String(options.user),
    password: String(options.password),
    database: String(options.database),
    entities: [
        pathJoin(process.env.NODE_PATH + "/modules/**/*.model{.ts,.js}"),
    ],
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "custom_migration_table",
    migrations: [pathJoin(process.env.NODE_PATH + "/migrations/**/*{.ts,.js}")],
    cli: {
        migrationsDir: "app/migrations"
    }
};

console.log(config);

export = config;
