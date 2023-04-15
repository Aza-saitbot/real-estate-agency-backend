import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Apartment} from "./apartment.model";
import {Category} from "./category";
import {CategoryEmployee} from "./category-employee.model";

@Table({tableName: 'employee', createdAt: false, updatedAt: false})
export class Employee extends Model<Employee> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    phone: string

    @Column({type: DataType.STRING, allowNull: true})
    username: string

    @BelongsToMany(() => Category, () => CategoryEmployee)
    categories: Category[]

    @HasMany(() => Apartment)
    apartments: Apartment[]

}