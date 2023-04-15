import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({example: 'Azamat', description: 'Имя риелтора'})
    @IsString({message: 'Имя риелтора должно быть строкой'})
    @IsNotEmpty({message: 'Имя риелтора не должно быть пустым'})
    name: string

    @ApiProperty({example: '+7(999)999-99-99', description: 'Номер телефона'})
    @IsString({message: 'Номер телефона должен быть строкой'})
    @IsNotEmpty({message: 'Номер телефона не должен быть пустым'})
    phone: string

    @ApiProperty({example: '@Azamat', description: 'Логин риелтора'})
    username: string
}