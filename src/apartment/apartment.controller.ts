import {Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApartmentService} from './apartment.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Apartment} from "../models";
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

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

    @Post('upload')
    @UseInterceptors(FilesInterceptor('images'))
    upload(@UploadedFiles() files) {
        return this.apartmentService.preview(files)
    }


}
