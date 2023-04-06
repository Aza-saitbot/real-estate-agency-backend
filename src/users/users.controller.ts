import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
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

    @ApiOperation({summary: 'Выдать роли'})
    @ApiResponse({status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.usersService.addRole(addRoleDto)
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('ban')
    ban(@Body() banUserDto: BanUserDto) {
        return this.usersService.ban(banUserDto)
    }
}


