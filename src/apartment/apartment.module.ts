import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Apartment} from "../models";

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService],
  imports: [
  SequelizeModule.forFeature([Apartment]),
    FilesModule
  ]
})
export class ApartmentModule {}
