import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./user.controller";
import { UsersRepository } from "./user.repository";
import { UserService } from "./user.service";
import { AuthenticationService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({ 
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService], 
        }),
    ],
    controllers: [UsersController],
    providers: [UserService, UsersRepository, AuthenticationService]
})
export class UsersModule {}