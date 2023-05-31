import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {Role, User} from "../models";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleRepository: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create(dto)
            const role = await this.roleRepository.getRoleByValue('USER')
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user
        }catch (e) {
            throw new HttpException({
                message: 'Пользователь с таким email уже существует',
                error_code: 2
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUser() {
        try {
            const users = await this.usersRepository.findAll({include: {all: true}})
            return users
        } catch (e) {
            throw new HttpException({
                message: 'Пользователи не найдены',
                error_code: 3
            }, HttpStatus.NOT_FOUND)
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.findByPk(dto.userId)
        const role = await this.roleRepository.getRoleByValue(dto.value)
        if (user && role) {
            await user.$add('roles', [role.id])
            return user
            }else {
                throw new HttpException({
                    message: 'Пользователь или роль не найдены',
                    error_code: 4
                }, HttpStatus.NOT_FOUND)
            }
        }

    async getOne(id: number) {
        try {
            const user = await this.usersRepository.findByPk(id,{
                include: [
                    {
                        model: Role,
                        as: 'roles',
                        attributes: ['value']
                    }
                ],
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },

            })
            return user
        } catch (e) {
            throw new HttpException({
                message: 'Пользователь не найден',
                error_code: 5
            }, HttpStatus.NOT_FOUND)
        }
    }
}
