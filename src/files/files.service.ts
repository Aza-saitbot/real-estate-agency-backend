import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {Image} from "../models";
import {InjectModel} from "@nestjs/sequelize";

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
        }catch (e) {
            throw new HttpException(
                {
                    message: 'Ошибка при загрузке файлов',
                    error_code: 11,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createApartment(images: string[], apartmentId: number): Promise<void> {
        const staticPath = path.resolve(__dirname, '..', 'static');
console.log('FILE SERVICE = images',images)
        for (const image of images) {
            const sourcePath = path.join(staticPath, image);

            if (fs.existsSync(sourcePath)) {
                await this.imageRepository.create({
                    filename: image,
                    apartmentId: apartmentId,
                });
            }else {
                return
            }
        }
    }

    async updateApartment(updatedFiles: string[], apartmentId: number) {
        const staticPath = path.resolve(__dirname, '..', 'static');

        // Получаем текущий список файлов из imageRepository
        const existingFiles = await this.imageRepository.findAll({
            attributes: ['filename'],
            where: { apartmentId },
            raw: true,
        });

        // Находим файлы, которые нужно удалить
        const filesToRemove = existingFiles.filter(file => !updatedFiles.includes(file.filename));

        // Удаляем файлы, которые больше не нужны
        filesToRemove.forEach(file => {
            const filePath = path.join(staticPath, file.filename);
            fs.unlinkSync(filePath);
        });

        // Обновляем поле с именами файлов в imageRepository
        for (const updatedFile of updatedFiles) {
            await this.imageRepository.update(
                { filename: updatedFile },
                { where: { apartmentId: apartmentId } }
            );
        }
    }


    async cleanPreviewFolder(): Promise<void> {
        const previewFolderPath = path.resolve(__dirname, '..', 'static');

        // Получаем список всех файлов в папке превью
        const files = await fs.promises.readdir(previewFolderPath);

        // Проверяем каждый файл, чтобы определить, используется ли он
        for (const file of files) {
            const isUsed = await this.imageRepository.findOne({ where: { filename: file } });

            // Если файл не используется, удаляем его
            if (!isUsed) {
                const filePath = path.join(previewFolderPath, file);
                await fs.promises.unlink(filePath);
            }
        }
    }

}