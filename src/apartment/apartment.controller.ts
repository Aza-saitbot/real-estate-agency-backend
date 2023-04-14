import {Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApartmentService} from './apartment.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Apartment} from "../models";
import {ValidationPipe} from "../pipes/validation.pipe";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {QueryGetApartmentDto} from "./dto/query-get-apartment.dto";

@Controller('apartment')
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) {
    }


    @ApiOperation({summary: 'Создание карточки недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    createApartment(@UploadedFiles() files, @Body() dto: CreateApartmentDto) {
        return this.apartmentService.create(dto, files)
    }

    @ApiOperation({summary: 'Получить все карточки недвижимости'})
    @ApiResponse({status: 200, type: [Apartment]})
    @Get()
    getAll(@Query() query: QueryGetApartmentDto) {
        return this.apartmentService.getAll(query)
    }

    @ApiOperation({summary: 'Получить карточку недвижимости'})
    @ApiResponse({status: 200, type: Apartment})
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.apartmentService.getOne(id)
    }


}
