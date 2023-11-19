import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Music } from './schemas/music-list.schema';
import {MusicListRepository} from './music-list.repository';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicListService {

    constructor(private readonly musicRepository: MusicListRepository) {}

    async getMusicById(
        music_id: string
        ): Promise<{music_name: string; singer: string; cover_image:URL;}> {
        const music_list =  await this.musicRepository.findOne({ music_id });


        const {music_name, singer, cover_image} = music_list;
        return {music_name, singer, cover_image};
    }

    async getMusicList(
        page: number,
        limit: number
    ): Promise<{music_name: string; singer: string; cover_image:URL;}[]> {
        const music_list =  await this.musicRepository.find({}, page, limit);

        return music_list.map(({music_name, singer, cover_image}) => ({music_name, singer, cover_image}));
    }

    async addMusic(music_name: string, singer:string, recording_date: Date, cover_image: URL): Promise<Music> {
        return this.musicRepository.create({
            music_id: uuidv4(),
            music_name,
            singer,
            recording_date,
            cover_image,
        })
    }

    async updateMusic(music_id: string, musicUpdates: UpdateMusicDto): Promise<Music> {
        return this.musicRepository.findOneAndUpdate({ music_id }, musicUpdates);
    }

    async searchMusic(query: string): Promise<{ music_name: string; singer: string; cover_image: URL; }[]> {
        const music_list = await this.musicRepository.search(query);

        return music_list.map(({ music_name, singer, cover_image }) => ({ music_name, singer, cover_image }));
    }
}
