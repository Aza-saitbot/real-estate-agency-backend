import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleRepository: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto)
        const role = await this.roleRepository.getRoleByValue('USER')
        await user.$set('roles', [user.id])

        return user
    }

    async getAllUser() {
        const users = await this.usersRepository.findAll({include: {all: true}})
        return users

    }

    async getOneUser() {

    }
}
