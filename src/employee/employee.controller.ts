import {Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee } from "../models";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Сотрудники')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({summary: 'Создание сотрудника'})
  @ApiResponse({status: 200, type: Employee})
  @UsePipes(ValidationPipe)
  @Post()
  createEmployee(@Body() dto:CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }


}
