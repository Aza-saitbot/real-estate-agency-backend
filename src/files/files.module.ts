import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {Image} from "../models";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
    providers: [FilesService],
    exports: [FilesService],
    imports: [
        SequelizeModule.forFeature([Image])
    ]
})
export class FilesModule {
}
