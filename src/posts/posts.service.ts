import {Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/createPostDto";
import {Post} from "../models";
import {FilesService} from "../files/files.service";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private readonly postsRepository: typeof Post,
                private readonly fileService: FilesService) {
    }

    async create(post: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        return await this.postsRepository.create({...post, image: fileName});
    }
}
