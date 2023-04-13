import { Injectable } from '@nestjs/common';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from '../models'
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private readonly categoryRepository: typeof Category) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(createCategoryDto)
        return category
    }

    async getAll() {
        const categorys = await this.categoryRepository.findAll()
        return categorys
    }
}
