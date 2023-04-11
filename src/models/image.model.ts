import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Apartment} from "./apartment.model";

@Table({tableName: 'image'})
export class Image extends Model<Image> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: true})
    filename: string

    @ForeignKey(() => Apartment)
    @Column({type: DataType.INTEGER})
    apartmentId: number;

    @BelongsTo(() => Apartment)
    apartment: Apartment;
}