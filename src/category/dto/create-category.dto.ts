import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({example:'Аренда',description:'Название категории'})
    @IsString()
    @IsNotEmpty()
    name: string;
}