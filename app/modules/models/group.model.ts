import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.model";

/**
 *  Group entity
 *  for corresponding Protobuf entity please check
 *  @see /app/proto/users/message.proto
 */
@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @Index()
    @Column({ length: 64})
    public uid: string = "";

    @Index()
    @Column({ length: 64 })
    public name: string = "";

    @ManyToMany(type => User, user => user.memberOf)
    public members: User[];

    constructor() {

    }

}
