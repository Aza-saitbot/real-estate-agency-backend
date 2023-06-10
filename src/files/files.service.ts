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
                const previewPath = path.resolve(__dirname, '..', 'static', 'previews');

                if (!fs.existsSync(previewPath)) {
                    fs.mkdirSync(previewPath, { recursive: true });
                }

                fs.writeFileSync(path.join(previewPath, filename), file.buffer);
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

    async moveFilesToApartment(fileNames: string[], apartmentId: number): Promise<void> {
        const imageFilePath = path.join(__dirname, '..', 'static', 'images');

        for (const fileName of fileNames) {
            await this.imageRepository.update(
                { apartmentId },
                { where: { filename: fileName } }
            );

            await fs.promises.rename(
                path.join(imageFilePath, 'previews', fileName),
                path.join(imageFilePath, fileName)
            );
        }
    }

    async cleanPreviewFolder(): Promise<void> {
        const previewFolderPath = path.resolve(__dirname, '..', 'static', 'previews');

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