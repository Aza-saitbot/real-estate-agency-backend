import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Basket, Post, Rating, Role, UserRoles} from "../models";

interface UserCreationAttr {
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'user@yandex.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: 'qwerty123', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'false', description: 'Заблокирован или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    ban: boolean

    @ApiProperty({example: 'За мат', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]

    @HasOne(() => Basket)
    basket: Basket

    @HasMany(()=>Rating)
    ratings: Rating[];
}