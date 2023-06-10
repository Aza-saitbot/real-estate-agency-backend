import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {Image} from "../models";
import {SequelizeModule} from "@nestjs/sequelize";
import {SchedulerService} from "./scheduler.service";


@Module({
    providers: [FilesService,SchedulerService],
    exports: [FilesService],
    imports: [
        SequelizeModule.forFeature([Image])
    ]
})
export class FilesModule {
}
