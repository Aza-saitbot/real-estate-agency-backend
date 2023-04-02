import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttr {
    name:string
    description:string
}

@Table({tableName:'roles'})
export class Role extends Model<Role,RoleCreationAttr>{

    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number

    @ApiProperty({example:'ADMINISTRATOR',description:'Уникальное значение роли'})
    @Column({type:DataType.STRING,unique:true,allowNull:false})
    name:string

    @ApiProperty({example:'Администратор',description:'Описание роли'})
    @Column({type:DataType.STRING, allowNull:false})
    description:string

    @BelongsToMany(()=>User,()=>UserRoles)
    users:User[]



}