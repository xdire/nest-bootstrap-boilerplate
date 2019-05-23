import {Controller, Inject} from "@nestjs/common";
import {UserListRequest, UserRequest} from "proto-compiled/users/request_pb";
import {User as ProtoUser} from "proto-compiled/users/message_pb";
import {Observable, of} from "rxjs";
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {UserListResponse} from "../../../proto-compiled/users/response_pb";
import {User} from "../../models/user.model";
import {v4 as UIDv4} from "uuid";
import {UserRepo} from "../../repo/user.repo";
import {Repository} from "typeorm";
@Controller()
export class UsersController {

    constructor(@Inject(UserRepo) private readonly userRepo: UserRepo) {

    }

    @GrpcMethod("users.UserService")
    public async create(request: User): Promise<Observable<User>> {

        console.log(request);

        const user = new User();
        user.email = request.email;
        user.firstName = request.firstName;
        user.lastName = request.lastName;
        user.login = request.login;
        user.password = request.password;
        user.uid = UIDv4();

        await this.userRepo.save(user);

        return of(user as any);

        // throw new RpcException({
        //     details: "Not Implemented"
        // });
    }

    @GrpcMethod("users.UserService")
    public async update(request: User): Promise<Observable<User>> {

        console.log("Update running");
        const user = await this.userRepo.findOne(request.id);
        // Update user information
        user.email = request.email;
        user.firstName = request.firstName;
        user.lastName = request.lastName;
        user.login = request.login;
        user.password = request.password;
        // Ask repo to save
        await this.userRepo.save(user);
        // Return observable
        return of(user as any);

    }

    @GrpcMethod("users.UserService")
    public async find(request: UserRequest&any): Promise<Observable<User>> {

        let user = null;
        if (request.findById) {
            user = await this.userRepo.findOne(request.findById.id);
        } else if (request.findByUID) {
            user = await this.userRepo.findOneUID(request.findByUID.uid);
        } else if (request.findByLogin) {
            user = await this.userRepo.findOneLogin(request.findByLogin.login);
        } else if (request.findByEmail) {
            user = await this.userRepo.findOneEmail(request.findByEmail.email);
        }
        // If fulfilled
        if (user)
        // Return observable
            return of(user as any);
        // Throw if cannot find anything
        throw new RpcException({
             details: "Not Found"
        });
    }

    @GrpcMethod("users.UserService")
    public async findMany(request: UserListRequest&any): Promise<Observable<UserListResponse.AsObject&any>> {

        if (typeof request.idList !== "undefined") {

            const users = await this.userRepo.findByIdList(request.idList.idList);

            return of({
                users: users
            });

        } else if (typeof request.pagelist !== "undefined") {

        }

        throw new RpcException({
            details: "Cannot determine format of the message, " +
                "on of the parameters need to be presented for correct" +
                " request"
        });

    }

    private createUser() {

    }

    private updateUser() {

    }

    private findById() {

    }

    private findByUId() {

    }

    private findByLogin() {

    }

    private findByEmail() {

    }

    private findByIdList() {

    }

    private findByPageList() {
        
    }

}