import {Controller} from "@nestjs/common";
import {UserListRequest, UserRequest} from "proto-compiled/users/request_pb";
import {User} from "proto-compiled/users/message_pb";
import {Observable} from "rxjs";
import {GrpcMethod, RpcException} from "@nestjs/microservices";
import {UserListResponse} from "../../../proto-compiled/users/response_pb";

@Controller()
export class UsersController {

    @GrpcMethod("users.UserService")
    public async find(request: UserRequest): Promise<Observable<User.AsObject>> {
        throw new RpcException({
            details: "Not Implemented"
        });
    }

    @GrpcMethod("users.UserService")
    public async findMany(request: UserListRequest): Promise<Observable<UserListResponse.AsObject>> {
        throw new RpcException({
            details: "Not Implemented"
        });
    }

}