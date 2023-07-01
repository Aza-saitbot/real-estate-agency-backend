import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {Image} from "../models";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";

@Injectable()
export class FilesService {

    constructor(@InjectModel(Image) private readonly imageRepository: typeof Image) {
    }

    async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
        try {
            const fileNames = [];
            for (const file of files) {
                const filename = uuidv4() + '.jpg';
                const filePath = path.resolve(__dirname, '..', 'static');
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true});
                }
                fs.writeFileSync(path.join(filePath, filename), file.buffer);
                fileNames.push(filename);
            }
            return fileNames;
        } catch (e) {
            throw new HttpException(
                {
                    message: 'Ошибка при загрузке файлов',
                    error_code: 11,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createApartment(fileNames: string[], apartmentId: number) {
        const staticPath = path.resolve(__dirname, '..', 'static');
        const images: Array<Image> = []

        for (const filename of fileNames) {
            const sourcePath = path.join(staticPath, filename);

            if (fs.existsSync(sourcePath)) {
                const image = await this.imageRepository.create({
                    filename,
                    apartmentId: apartmentId,
                });
                images.push(image)
            } else {
                throw new HttpException(
                    {
                        message: 'Ошибка при создании записи изображения к апартаменту',
                        error_code: 12,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
        return images
    }

    async updateApartment (fileNames: string[], apartmentId: number) {
        const staticPath = path.resolve(__dirname, '..', 'static');
        const images: Array<Image> = [];

        for (const filename of fileNames) {
            const sourcePath = path.join(staticPath, filename);

            if (fs.existsSync(sourcePath)) {
                const [updatedCount] = await this.imageRepository.update(
                    { filename },
                    { where: { apartmentId, filename } }
                );

                if (updatedCount === 0) {
                    throw new HttpException(
                        {
                            message: 'Ошибка при обновлении записи изображения для апартамента',
                            error_code: 12,
                        },
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }

                const updatedImage = await this.imageRepository.findOne({ where: { apartmentId, filename } });
                images.push(updatedImage);
            } else {
                throw new HttpException(
                    {
                        message: 'Ошибка при обновлении записи изображения для апартамента',
                        error_code: 12,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }

        return images;
    }



    async cleanPreviewFolder(): Promise<void> {
        const previewFolderPath = path.resolve(__dirname, '..', 'static');

        // Получаем список всех файлов в папке превью
        const files = await fs.promises.readdir(previewFolderPath);

        // Проверяем каждый файл, чтобы определить, используется ли он
        for (const file of files) {
            const isUsed = await this.imageRepository.findOne({where: {filename: file}});

            // Если файл не используется, удаляем его
            if (!isUsed) {
                const filePath = path.join(previewFolderPath, file);
                await fs.promises.unlink(filePath);
            }
        }
    }

    async destroy(apartmentId: number[] ) {
        await this.imageRepository.destroy({
            where: {apartmentId}
        });
    }
}