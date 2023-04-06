import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example:'user@yandex.ru',description:'Почтовый адрес'})
    @IsString({message:'Почтовый адрес должен быть строкой'})
    @IsEmail({},{message:'Почтовый адрес должен быть корректным'})
    readonly email:string

    @ApiProperty({example:'qwerty123',description:'Пароль'})
    @IsString({message:'Пароль должен быть строкой'})
    @Length(4,16,{message:'Пароль должен быть длиннее 4 символов и не больше 16'})
    readonly password:string
}