import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes
} from '@nestjs/common';
import {ApartmentService} from './apartment.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Apartment} from "../models";
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateApartmentDto} from "./dto/create-apartment.dto";

@Controller('apartment')
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) {
    }

    @ApiOperation({summary: 'Создание карточки недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateApartmentDto) {
        return this.apartmentService.create(dto)
    }

    @ApiOperation({summary: 'Обновить карточку недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: CreateApartmentDto) {
        return this.apartmentService.update(id, dto)
    }

    @ApiOperation({summary: 'Удалить карточки недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @Delete()
    delete(@Body() dto: number[]) {
        return this.apartmentService.deleteApartments(dto)
    }

    @ApiOperation({summary: 'Получить все карточки недвижимости'})
    @ApiResponse({status: 200, type: [Apartment]})
    @Get()
    // @Query() query: QueryGetApartmentDto
    getAll() {
        return this.apartmentService.getAll()
    }

    @ApiOperation({summary: 'Получить карточку недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.apartmentService.getOne(id)
    }


}
