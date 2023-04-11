import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./users.model";
import {Apartment} from "./apartment.model";

@Table({tableName: 'rating'})
export class Rating extends Model<Rating> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Apartment)
    @Column({type: DataType.INTEGER})
    apartmentId: number;

    @Column({type: DataType.STRING})
    rate: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Apartment)
    apartment: Apartment;
}