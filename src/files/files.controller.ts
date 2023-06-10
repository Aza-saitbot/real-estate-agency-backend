import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FilesService} from "./files.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateApartmentDto} from "../apartment/dto/create-apartment.dto";

@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('images'))
    uploadFiles(@UploadedFiles() files, @Body() dto: CreateApartmentDto) {
        return this.fileService.uploadFiles(files)
    }

}
