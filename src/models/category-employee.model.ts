import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Category} from "./category";
import {Employee} from "./employee.model";

@Table({tableName: 'category_employee', createdAt: false, updatedAt: false})
export class CategoryEmployee extends Model<CategoryEmployee> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    categoryId: number;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employeeId: number;
}