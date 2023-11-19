import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Music, MusicDocument } from './schemas/music-list.schema';

@Injectable()
export class MusicListRepository {
    constructor(@InjectModel(Music.name) private userModel: Model<MusicDocument>) {}

    async findOne(
        userFilterQuery: FilterQuery<Music>
    ): Promise<Music> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(
        usersFilterQuery: FilterQuery<Music>,
        page: number,
        limit: number
    ): Promise<Music[]> {
        const items = (page-1)*limit;
        return this.userModel.find(usersFilterQuery).skip(items).limit(limit);
    }

    async create(user: Music): Promise<Music> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<Music>, user: Partial<Music>): Promise<Music> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }

    async search(query: string): Promise<Music[]> {
        const searchRegex = new RegExp(query, 'i'); 
        return this.userModel.find({
            $or: [
                { music_name: { $regex: searchRegex } },
                { singer: { $regex: searchRegex } },
            ],
        });
    }
}