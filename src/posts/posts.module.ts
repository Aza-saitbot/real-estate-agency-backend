import {Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {User, Post} from "../models";
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
      FilesModule
  ],
})
export class PostsModule {}
