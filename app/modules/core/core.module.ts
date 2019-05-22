import {Module} from "@nestjs/common";
import {UsersController} from "./controllers/users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoaderManager} from "../../configurations/autoloader/loader.manager";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => await LoaderManager.getConfigurationAsync("core-database")
        }),
    ],
    controllers: [
        UsersController
    ]
})

export class CoreModule {

}