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

    @ApiProperty({example: 'Mersin', description: 'Название провинции'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'Mersin'})
    provinces: string

    @ApiProperty({example: 'Mezitli', description: 'Название округа'})
    @Column({type: DataType.STRING, allowNull: false})
    county: string

    @ApiProperty({example: 'Deniz Mah', description: 'Название района'})
    @Column({type: DataType.STRING, allowNull: false})
    district: string

    @ApiProperty({example: '10.99835602', description: 'геолокация ширина'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    lat: number

    @ApiProperty({example: '77.01502627', description: 'геолокация долгота'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    lng: number

    @ApiProperty({
        example: 'В РАЙОНЕ ТЕДЖЕ МЕБЛИРОВАННАЯ 1+1 С БАССЕЙНОМ И ИНФРАСТРУКТУРОЙ К МОРЮ 350 МЕТРОВ',
        description: 'Описание апартамента'
    })
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @ApiProperty({example: '1+1', description: 'Количество комнат'})
    @Column({type: DataType.STRING, allowNull: false})
    totalRooms: string

    @ApiProperty({example: '120', description: 'Общий площадь апартамента - Брутто'})
    @Column({type: DataType.INTEGER, allowNull: false})
    totalArea: number

    @ApiProperty({example: 12, description: 'Количество этажей дома'})
    @Column({type: DataType.INTEGER, allowNull: false})
    totalFloors: number

    @ApiProperty({example: '2', description: 'Этаж апартамента'})
    @Column({type: DataType.INTEGER, allowNull: false})
    locationFloor: number

    @ApiProperty({example: 'Природный газ (комбинированный)', description: 'Тип разогрева'})
    @Column({type: DataType.STRING, allowNull: true})
    heatingType: string

    @HasMany(() => Image)
    images: Image[];

    @ForeignKey(()=>Category)
    @Column({type: DataType.INTEGER})
    categoryId: number

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(()=>Employee)
    @Column({type: DataType.INTEGER})
    employeeId: number

    @BelongsTo(() => Employee)
    employee: Employee;

    @HasMany(() => ApartmentInfo)
    apartmentInfos: ApartmentInfo[];

    @HasMany(()=>Rating)
    ratings: Rating[];
}