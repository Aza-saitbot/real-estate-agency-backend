import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Basket, Rating, Role, UserRoles} from "../models";

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

    @ApiProperty({example: 'Азамат Бадалов', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    fullName: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Basket)
    basket: Basket

    @HasMany(() => Rating)
    ratings: Rating[];

}