import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FilesService } from './files.service';

@Injectable()
export class SchedulerService implements OnApplicationBootstrap {
    constructor(private readonly filesService: FilesService) {}

    async onApplicationBootstrap() {
        // При старте приложения выполняем очистку папки превью
        await this.filesService.cleanPreviewFolder();
    }

    @Cron('0 0 * * *') // Запускать каждый день в полночь
    async handleCron() {
        // Выполняем очистку папки превью по расписанию
        await this.filesService.cleanPreviewFolder();
    }
}
