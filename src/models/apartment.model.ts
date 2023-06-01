import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ApartmentInfo, Category, Employee, Image, Rating} from "../models";

@Table({tableName: 'apartment'})
export class Apartment extends Model<Apartment> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Сдает уютная евродвушка', description: 'Заголовок апартамента'})
    @Column({type: DataType.STRING, allowNull: true})
    title: string

    @ApiProperty({example: 'USD', description: 'Валюта платежа'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'TRY'})
    currency: string

    @ApiProperty({example: '1500000', description: 'Стоимость апартамента'})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    price: number

    @ApiProperty({example: 'Mersin,Mezitli,Deniz Mah', description: 'Адрес'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'Mersin'})
    address: string

    @HasMany(() => Image)
    images: Array<string>;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    categoryId: number

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employeeId: number

    @BelongsTo(() => Employee)
    employee: Employee;

    @HasMany(() => ApartmentInfo, {as: 'apartmentInfos'})
    apartmentInfos: ApartmentInfo[];
}