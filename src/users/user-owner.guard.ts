import {HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserOwnerGuard implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' && !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const user = this.jwtService.verify(token)
            req.user = user

            if (user.email === process.env.OWNER_EMAIL) {
                req.user.isOwner = true;
            } else {
                req.user.isOwner = false;
            }
            next();
        } catch (e) {
            throw new HttpException('У пользователя нет доступа', HttpStatus.FORBIDDEN)
        }
    }
}