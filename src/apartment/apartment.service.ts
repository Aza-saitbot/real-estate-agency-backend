import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Apartment, ApartmentInfo, Image} from "../models";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ApartmentService {

    constructor(@InjectModel(Apartment) private readonly apartmentRepository: typeof Apartment,
                private readonly fileService: FilesService) {
    }

    async create(dto: CreateApartmentDto): Promise<Apartment> {
        console.log('PROPSSSSSSSSSSSSSSs',dto)
        const { apartmentInfos,fileNames, ...createApartmentProps } = dto;

        if (fileNames.length === 0) {
            throw new HttpException(
                {
                    message: 'Необходимо загрузить хотя бы один файл',
                    error_code: 6,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const apartment = await this.apartmentRepository.create(createApartmentProps);
console.log('apartment 44444444',apartment)
            if (apartmentInfos) {
                const info: ApartmentInfo = JSON.parse(apartmentInfos);

                if (info) {
                    await ApartmentInfo.create({
                        apartmentId: apartment.id,
                        ...info,
                    });
                }
            }

            await this.fileService.moveFilesToApartment(fileNames, apartment.id);

            apartment.images = fileNames;
            await apartment.save();

            return apartment;
        } catch (e) {
            console.log('Ошибка при создании апартамента',e)
            throw new HttpException(
                {
                    message: 'Ошибка при создании апартамента',
                    error_code: 6,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async update(id: number, dto: CreateApartmentDto): Promise<Apartment> {
        const { apartmentInfos,fileNames, ...updateApartmentProps } = dto;

        try {
            const apartment = await this.apartmentRepository.findByPk(id);

            if (!apartment) {
                throw new HttpException(
                    {
                        message: 'Апартамент не найден',
                        error_code: 6,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            // Обновляем свойства апартамента
            Object.assign(apartment, updateApartmentProps);
            await apartment.save();

            // Обновляем информацию апартамента
            if (apartmentInfos) {
                const info: ApartmentInfo = JSON.parse(apartmentInfos);

                if (info) {
                    const existingInfo = await ApartmentInfo.findOne({ where: { apartmentId: apartment.id } });

                    if (existingInfo) {
                        Object.assign(existingInfo, info);
                        await existingInfo.save();
                    } else {
                        await ApartmentInfo.create({
                            apartmentId: apartment.id,
                            ...info,
                        });
                    }
                }
            }

            // Обновляем изображения апартамента
            if (fileNames.length > 0) {
                await this.fileService.moveFilesToApartment(fileNames, apartment.id);
            }

            return apartment;
        } catch (e) {
            throw new HttpException(
                {
                    message: 'Ошибка при обновлении апартамента',
                    error_code: 6,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAll() {
        try {
            const apartments = await this.apartmentRepository.findAll({
                include: [
                //     {
                //         model: ApartmentInfo,
                //         as: 'apartmentInfos'
                //     },
                    {
                        model: Image,
                        as: 'images',
                        attributes: ['filename', 'id']
                    }
                ]
            })
            return apartments
        }catch (e) {
            throw new HttpException({
                message: 'Ошибка при получении апартаментов',
                error_code: 7
            }, HttpStatus.NOT_FOUND)
        }
    }


    async getOne(id: number) {
        try {
            const apartment = await this.apartmentRepository.findOne({
                where: {id},
                include: [
                    // {
                    //     model: ApartmentInfo,
                    //     as: 'apartmentInfos'
                    // },
                    {
                        model: Image,
                        as: 'images',
                        attributes: ['filename', 'id']
                    }
                ]
            })
            if (!apartment) {
                throw new HttpException({
                    message: 'Апартамент не найден',
                    error_code: 9
                }, HttpStatus.NOT_FOUND)
            }
            return apartment
        }catch (e) {
            throw new HttpException({
                message: 'Ошибка при получении апартамента',
                error_code: 8
            }, HttpStatus.NOT_FOUND)
        }
    }

}

// query: QueryGetApartmentDto
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
