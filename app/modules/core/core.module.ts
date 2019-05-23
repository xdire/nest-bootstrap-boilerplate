import {Module} from "@nestjs/common";
import {UsersController} from "./controllers/users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoaderManager} from "../../configurations/autoloader/loader.manager";
import {UserRepo} from "../repo/user.repo";
import {User} from "../models/user.model";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => await LoaderManager.getConfigurationAsync("core-database")
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        UserRepo
    ],
    controllers: [
        UsersController
    ]
})

export class CoreModule {

}