import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {Image} from "../models";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class FilesService {

    constructor(@InjectModel(Image) private readonly imageRepository: typeof Image) {
    }

    async createFiles(files: Express.Multer.File[], apartmentId?: number): Promise<Array<string>> {
        const previewFileNames = [];
        const imagesFileNames = [];
        const previewPath = path.resolve(__dirname, '..', 'static', 'previews');
        const imagesPath = path.resolve(__dirname, '..', 'static', 'images');

        if (!fs.existsSync(previewPath)) {
            fs.mkdirSync(previewPath, { recursive: true });
        }

        if (!fs.existsSync(imagesPath)) {
            fs.mkdirSync(imagesPath, { recursive: true });
        }

        for (const file of files) {
            const filename = uuidv4() + '.jpg';

            if (apartmentId) {
                fs.writeFileSync(path.join(imagesPath, filename), file.buffer);
                imagesFileNames.push(filename);
                await this.imageRepository.create({ filename, apartmentId });
            } else {
                fs.writeFileSync(path.join(previewPath, filename), file.buffer);
                previewFileNames.push(filename);
            }
        }

        if (apartmentId) {
            return imagesFileNames;
        } else {
            return previewFileNames;
        }
    }

}