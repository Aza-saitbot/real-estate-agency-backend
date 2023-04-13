import { Injectable } from '@nestjs/common';
import {Apartment} from "../models";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {QueryGetApartmentDto} from "./dto/query-get-apartment.dto";

@Injectable()
export class ApartmentService {

    constructor(@InjectModel(Apartment) private readonly apartmentRepository:typeof Apartment,
                private readonly fileService: FilesService) {
    }

    async create(dto: CreateApartmentDto,files: Express.Multer.File[]): Promise<CreateApartmentDto> {
        console.log('dto',dto)
        console.log('files',files)
        const apartment = await this.apartmentRepository.create(dto);
        const images = await this.fileService.createFiles(files,apartment.id);

        apartment.images = images;
        await apartment.save();
        return apartment;
    }

   async getAll(query:QueryGetApartmentDto) {
       const {categoryId,employeeId,page=1,limit=9} =query
       const offset = page*limit-limit
       if (!categoryId && !employeeId) {
           const apartments = await this.apartmentRepository.findAll({
               offset,
               limit,
           })
           return apartments
       }
       if (categoryId && !employeeId) {
           const apartments = await this.apartmentRepository.findAll({
               where: {
                   categoryId
               },
               offset,
               limit,
           })
           return apartments
       }
       if (!categoryId && employeeId) {
           const apartments = await this.apartmentRepository.findAll({
               where: {
                   employeeId
               },
               offset,
               limit,
           })
           return apartments
       }
       if (categoryId && employeeId) {
           const apartments = await this.apartmentRepository.findAll({
               where: {
                   categoryId,
                   employeeId
               },
               offset,
               limit,
           })
           return apartments
       }
    }
}
