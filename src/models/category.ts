import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Employee} from "./employee.model";
import {Apartment} from "./apartment.model";
import {CategoryEmployee} from "./category-employee.model";

@Table({tableName: 'category', createdAt: false, updatedAt: false})
export class Category extends Model<Category> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: true, unique: true})
    name: string

    @BelongsToMany(() => Employee, () => CategoryEmployee)
    employees: Employee[]

    @HasMany(() => Apartment)
    apartments: Apartment[]
}