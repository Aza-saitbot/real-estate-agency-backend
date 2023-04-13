import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {Employee} from "../models";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class EmployeeService {

    constructor(@InjectModel(Employee) private readonly employeeRepository: typeof Employee) {
    }

    async createEmployee(dto: CreateEmployeeDto) {

            const candidate = await this.employeeRepository.findOne({where: {phone: dto.phone}})
            if (candidate){
                throw new HttpException('Сотрудник с таким телефоном уже существует ', HttpStatus.BAD_REQUEST)
            }
            const employee = await this.employeeRepository.create(dto);
            return employee

    }

    getEmployees() {
        const employees = this.employeeRepository.findAll();
        return employees
    }
}
