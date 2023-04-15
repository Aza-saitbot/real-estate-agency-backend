import {Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {RolesController} from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User, UserRoles, Role } from "../models";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles])
    ],
    exports: [RolesService]
})
export class RolesModule {
}
