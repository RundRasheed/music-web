import { Body, Controller, Get, Post, Param, Patch, Query, UseGuards, Req } from '@nestjs/common';
import { MusicListService } from './music-list.service';
import { Music } from './schemas/music-list.schema';
import { AddMusicDto} from './dto/add-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuthGuard } from 'src/auth/admin.guard';
import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';


@Controller('music-list')
export class MusicListController {
    constructor(private readonly musicListService: MusicListService) {}


    @Get(':music_id')
    async getMusic(
        @Param('music_id') musicId: string,
    ): Promise<{music_name: string; singer: string; cover_image:URL;}> {
        return this.musicListService.getMusicById(musicId);
    }

    @Get()
    async getMusicList(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{music_name: string; singer: string; cover_image:URL;}[]> {
        return this.musicListService.getMusicList(page, limit);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createMusic(@Req() request: Request, @Body() addMusicDto: AddMusicDto): Promise<Music> {
        if (request.user.role == "ADMIN") {
            
            return this.musicListService.addMusic(addMusicDto.music_name, addMusicDto.singer, 
                addMusicDto.recording_date, addMusicDto.cover_image);
          } else {
            throw new ForbiddenException('You do not have permission to add music.');
          }
        
    }

    @Patch(':music_id')
    async updateMusic(@Param('music_id') musicId: string, @Body() updateMusicDto: UpdateMusicDto): Promise<Music> {
        return this.musicListService.updateMusic(musicId, updateMusicDto);
    }

    @Get('search/:query')
    async searchMusic(@Param('query') query: string): Promise<{ music_name: string; singer: string; cover_image: URL; }[]> {
        return this.musicListService.searchMusic(query);
    }
}
