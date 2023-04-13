import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import { Employee} from "../models";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    SequelizeModule.forFeature([Employee])
  ],
})
export class EmployeeModule {}
