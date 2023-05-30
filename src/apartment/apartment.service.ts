import {Injectable} from '@nestjs/common';
import {Apartment, ApartmentInfo, Image} from "../models";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {QueryGetApartmentDto} from "./dto/query-get-apartment.dto";

@Injectable()
export class ApartmentService {

    constructor(@InjectModel(Apartment) private readonly apartmentRepository: typeof Apartment,
                private readonly fileService: FilesService) {
    }

    async create(dto: CreateApartmentDto, files: Express.Multer.File[]): Promise<Apartment> {

        const {apartmentInfos, ...createApartmentProps} = dto
        const apartment = await this.apartmentRepository.create(createApartmentProps);
        if (apartmentInfos) {
            const info: ApartmentInfo = JSON.parse(apartmentInfos)
            if (info) {
                await ApartmentInfo.create({
                    apartmentId: apartment.id,
                    ...info
                })
            }
        }

        const images = await this.fileService.createFiles(files, apartment.id);

        apartment.images = images;
        await apartment.save();
        return apartment;
    }

    async getAll(query: QueryGetApartmentDto) {

        const apartments = await this.apartmentRepository.findAll({
            include: [
                {
                    model: ApartmentInfo,
                    as: 'apartmentInfos'
                },
                {
                    model: Image,
                    as: 'images',
                    attributes: ['filename', 'id']
                }
            ]
        })
        return apartments
    }


    async getOne(id: number) {
        const apartment = await this.apartmentRepository.findOne({
            where: {id},
            include: [
                {
                    model: ApartmentInfo,
                    as: 'apartmentInfos'
                },
                {
                    model: Image,
                    as: 'images',
                    attributes: ['filename', 'id']
                }
            ]
        })
        return apartment
    }
}

// client:getServerSideProps
// const {categoryId, employeeId, page = 1, limit = 9} = query
// const offset = page * limit - limit
// const where: { categoryId?: number, employeeId?: number } = {}
//
// if (categoryId && !employeeId) {
//     where.categoryId = categoryId
// }
// if (!categoryId && employeeId) {
//     where.employeeId = employeeId
// }
// if (categoryId && employeeId) {
//     where.employeeId = employeeId
//     where.categoryId = categoryId
// }
