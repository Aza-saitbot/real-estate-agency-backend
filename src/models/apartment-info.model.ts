import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Apartment} from "./apartment.model";

export interface AttrCreateApartmentInfo {
    netArea: number
    buildingAge: string
    totalBathrooms: number
    totalHalls: number
    isBalcony: boolean
    isGarden: boolean
    InternalFeatures: string
    externalFeatures: string
    environmentalFeatures: string
}

@Table({tableName: 'apartment_info'})
export class ApartmentInfo extends Model<ApartmentInfo, AttrCreateApartmentInfo> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: '120', description: 'Чистая площадь - Нетто'})
    @Column({type: DataType.INTEGER, allowNull: false})
    netArea: number

    @ApiProperty({example: '5-10 arasi', description: 'Возраст дома'})
    @Column({type: DataType.STRING, allowNull: false})
    buildingAge: string

    @ApiProperty({example: '1', description: 'Количество ванных комнат'})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 1})
    totalBathrooms: number

    @ApiProperty({example: '1', description: 'Количество залов'})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    totalHalls: number

    @ApiProperty({example: 'false', description: 'балконная квартира'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isBalcony: boolean

    @ApiProperty({example: 'false', description: 'Мебельная квартира'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isGarden: boolean

    @ApiProperty({example: 'Американская кухня, душ, морозильник', description: 'ВНУТРЕННИЕ ОСОБЕННОСТИ'})
    @Column({type: DataType.STRING})
    InternalFeatures: string

    @ApiProperty({example: 'Детская площадка, Сауна, генератор', description: 'ВНЕШНИЕ ОСОБЕННОСТИ'})
    @Column({type: DataType.STRING})
    externalFeatures: string

    @ApiProperty({example: 'Рынок, детский сад, банк', description: 'ЭКОЛОГИЧЕСКИЕ ОСОБЕННОСТИ'})
    @Column({type: DataType.STRING})
    environmentalFeatures: string

    @ForeignKey(() => Apartment)
    @Column({type: DataType.INTEGER})
    apartmentId: number

    @BelongsTo(() => Apartment)
    apartment: Apartment;
}