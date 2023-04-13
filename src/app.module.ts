import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {
    User,
    UserRoles,
    Role,
    Post,
    Employee,
    CategoryEmployee,
    Category,
    Basket,
    Apartment,
    Image,
    ApartmentInfo,
    BasketApartment,
    Rating
} from "./models";
import {ServeStaticModule} from "@nestjs/serve-static";
import { CategoryModule } from './category/category.module';
import * as path from "path";
import {AuthModule} from "./auth/auth.module";
import {RolesModule} from "./roles/roles.module";
import {UsersModule} from "./users/users.module";
import {PostsModule} from "./posts/posts.module";
import { EmployeeModule } from './employee/employee.module';
import {ApartmentModule} from "./apartment/apartment.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                UserRoles,
                Role,
                Post,
                Employee,
                CategoryEmployee,
                Category,
                Basket,
                Apartment,
                Image,
                ApartmentInfo,
                BasketApartment,
                Rating
            ],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        CategoryModule,
        EmployeeModule,
        ApartmentModule
    ],
    exports: []
})
export class AppModule {

}


