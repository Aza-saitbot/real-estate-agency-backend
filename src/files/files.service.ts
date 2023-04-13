import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {join} from "path";
import {createWriteStream} from "fs";
import {Image} from "../models";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class FilesService {

    constructor(@InjectModel(Image) private readonly imageRepository: typeof Image) {
    }

    async createFile(file): Promise<string> {
        try {
            // path.extname(file.originalname)
            const fileName = uuidv4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new HttpException('Ошибка создания файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFiles(files: Express.Multer.File[], apartmentId: number): Promise<Array<string>> {
        const fileNames = [];
        for (const file of files) {
            const filename = uuidv4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, filename), file.buffer);
            fileNames.push(filename);
            await this.imageRepository.create({filename, apartmentId});
        }
        return fileNames;
    }
}

