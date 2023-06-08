import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FilesService} from "./files.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateApartmentDto} from "../apartment/dto/create-apartment.dto";

@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {
    }

    @Post('/preview')
    @UseInterceptors(FilesInterceptor('images'))
    createApartment(@UploadedFiles() files, @Body() dto: CreateApartmentDto) {
        return this.fileService.createFiles(files)
    }

}
