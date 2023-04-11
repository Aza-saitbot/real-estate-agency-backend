import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Basket} from "./basket.model";
import {User} from "./users.model";

@Table({tableName: 'basket_apartment'})
export class BasketApartment extends Model<BasketApartment> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Basket)
    @Column({type: DataType.INTEGER})
    basketId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => Basket)
    basket: Basket
}