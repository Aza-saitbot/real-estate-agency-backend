import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from 'bcryptjs'
import {User} from "../models";


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService
    ) {
    }

    async login(userDto: CreateUserDto) {
        try {
            const user = await this.validateUser(userDto)
            return this.generateToken(user)
        } catch (e) {
            throw new UnauthorizedException({
                message: 'Неверный логин или пароль',
                code: 2
            })
        }
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(
                {
                    error_code: 1,
                    message: 'Пользователь с таким email уже существует'
                },
                HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcryptjs.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})

        return this.generateToken(user)

    }

    private async generateToken(user: User) {
        const roles =user.roles.map(({value}) => value)
        const payload = {id: user.id, email: user.email, roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcryptjs.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Не корректный email или password'})
    }
}
