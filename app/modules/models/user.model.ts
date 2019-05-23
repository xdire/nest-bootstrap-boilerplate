import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./group.model";

/**
 *  User entity
 *  for corresponding Protobuf entity please check
 *  @see /app/proto/users/message.proto
 */
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index({unique:true})
    @Column({ length: 64})
    public uid: string = "";

    @Index({unique:true})
    @Column({ length: 64 })
    public login: string = "";

    @Index({unique:true})
    @Column({ length: 128 })
    public email: string = "";

    @Column({ length: 64 })
    public firstName: string = "";

    @Column({ length: 64 })
    public lastName: string =  "";

    @Column({ length: 256 })
    public password: string = "";

    @ManyToMany(type => Group, group => group.members)
    memberOf: Group[];

    constructor() {

    }

}
