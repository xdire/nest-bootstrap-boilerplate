import {Module} from "@nestjs/common";
import {UsersController} from "./controllers/users.controller";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {LoaderManager} from "../../configurations/autoloader/loader.manager";



@Module({
    imports: [
        TypeOrmModule.forRootAsync(LoaderManager.getConfigurationAsync<TypeOrmModuleOptions>("core-database")),
    ],
    controllers: [
        UsersController
    ]
})

export class CoreModule {

}