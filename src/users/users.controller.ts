import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ValidationPipe} from "../pipes/validation.pipe";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {User} from "../models";
import {UserOwnerGuard} from "./user-owner.guard";



@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUser()
    }

    @ApiOperation({summary: 'Получить одного пользователя'})
    @ApiResponse({status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:id')
    getOne(@Param('id') id: string) {
        console.log('id', id)
        try {
            return this.usersService.getOne(Number(id))
        } catch (e) {
            throw new HttpException('Пользователь не найден ', HttpStatus.NOT_FOUND)
        }
    }

    @ApiOperation({summary: 'Выдать роли'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.usersService.addRole(addRoleDto)
    }
}


