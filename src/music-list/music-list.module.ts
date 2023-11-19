import { Module } from '@nestjs/common';
import { MusicListService } from './music-list.service';
import { MusicListController } from './music-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from './schemas/music-list.schema';
import { MusicListRepository } from './music-list.repository';
import { AuthenticationService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({ 
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService], 
        }),
    ],
    controllers : [MusicListController],
    providers : [MusicListService, MusicListRepository, AuthenticationService]
})
export class MusicListModule {}
