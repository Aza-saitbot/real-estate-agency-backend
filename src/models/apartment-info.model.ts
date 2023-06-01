import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Apartment} from "./apartment.model";

export interface AttrCreateApartmentInfo {
    title:string
    description:string
}

@Table({tableName: 'apartment_info'})
export class ApartmentInfo extends Model<ApartmentInfo, AttrCreateApartmentInfo> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Apartment)
    @Column({type: DataType.INTEGER})
    apartmentId: number

    @ApiProperty({example: 'Чистая площадь', description: 'Название описание'})
    @Column({type: DataType.STRING, allowNull:false})
    title: string

    @ApiProperty({example: '100', description: 'Значение описание'})
    @Column({type: DataType.STRING, allowNull:false})
    description: string

    @BelongsTo(() => Apartment)
    apartment: Apartment;
}