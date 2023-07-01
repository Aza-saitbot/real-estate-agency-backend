import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Apartment, ApartmentInfo, Image} from "../models";
import {CreateApartmentDto} from "./dto/create-apartment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";


@Injectable()
export class ApartmentService {

    constructor(@InjectModel(Apartment) private readonly apartmentRepository: typeof Apartment,
                private readonly fileService: FilesService) {
    }

    async create(dto: CreateApartmentDto): Promise<Apartment> {

        try {
            console.log('CREATE dto',dto)
            const { apartmentInfos,images, ...createApartmentProps } = dto;

            if (images?.length === 0) {
                throw new HttpException(
                    {
                        message: 'Необходимо загрузить хотя бы один файл',
                        error_code: 6,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
            const apartment = await this.apartmentRepository.create(createApartmentProps);

            if (apartmentInfos) {
                const info: ApartmentInfo = JSON.parse(apartmentInfos);

                if (info) {
                    await ApartmentInfo.create({
                        apartmentId: apartment.id,
                        ...info,
                    });
                }
            }

            await this.fileService.createApartment(images, apartment.id);

            apartment.images = images
            await apartment.save();
            
            console.log('Должны быть здесь лежать с изображениями',apartment)

            return apartment;
        } catch (e) {
            console.log('ОШИИИБКА ПРИ СОЗДАНИИ АПАРТАМЕНТА',e)
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
        const { apartmentInfos,images, ...updateApartmentProps } = dto;

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
            console.log('обновлением свойств',apartment,updateApartmentProps)

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
            if (images.length > 0) {
                await this.fileService.updateApartment(images, apartment.id);
            }
            apartment.images = images
            await apartment.save();

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

    async deleteApartments(apartmentIds: number[]): Promise<void> {
        try {
            // Удаляем записи изображений, связанные с апартаментами
            await this.fileService.destroy( apartmentIds );

            // Удаляем записи информации об апартаментах, связанные с апартаментами
            await ApartmentInfo.destroy({ where: { apartmentId: apartmentIds } });

            // Удаляем апартаменты
            await this.apartmentRepository.destroy({ where: { id: apartmentIds } });
        } catch (e) {
            throw new HttpException(
                {
                    message: 'Ошибка при удалении апартаментов',
                    error_code: 12,
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
                        attributes: ['filename']
                    }
                ]
            })
            console.log('BAAAAACKEND APARTMENTS',apartments)
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
                        attributes: ['filename']
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
