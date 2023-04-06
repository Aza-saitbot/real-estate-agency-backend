import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {BanUserDto} from "./dto/ban-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {User} from "./users.model";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleRepository: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto)
        const role = await this.roleRepository.getRoleByValue('ADMIN')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUser() {
        const users = await this.usersRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.findByPk(dto.userId)
        const role = await this.roleRepository.getRoleByValue(dto.value)
        if (user && role) {
            await user.$add('role', role.id)
            return dto
        }

        throw new HttpException('Пользователь или роль не найден ', HttpStatus.NOT_FOUND)

    }

    async ban(dto: BanUserDto) {
        const user = await this.usersRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('Пользователь не найден ', HttpStatus.NOT_FOUND)
        }
        user.ban = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }


}
