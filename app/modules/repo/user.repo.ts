import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user.model";
import {Repository} from "typeorm";

@Injectable()
export class UserRepo {

    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    public save(user: User): Promise<User> {
        return this.repo.save(user);
    }

    public findOne(id: number): Promise<User> {
        return this.repo.findOne({id: Number(id)});
    }

    public findOneUID(uid: string): Promise<User> {
        return this.repo.findOne({uid});
    }

    public findOneLogin(login: string): Promise<User> {
        return this.repo.findOne({login});
    }

    public findOneEmail(email: string): Promise<User> {
        return this.repo.findOne({email});
    }

    public findByIdList(idList: number[]): Promise<User[]> {
        return this.repo.findByIds(idList);
    }

}