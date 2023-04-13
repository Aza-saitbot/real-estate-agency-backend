import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from "./dto/createPostDto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() post: CreatePostDto,
           @UploadedFile() image) {
        return this.postsService.create(post, image);
    }
}
