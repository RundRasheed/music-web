import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MusicDocument = Music & Document;

@Schema()
export class Music{ 
    @Prop()
    music_id: string;

    @Prop()
    music_name: string;

    @Prop()
    singer: string;

    @Prop()
    recording_date: Date;

    @Prop()
    cover_image: URL;
}

export const MusicSchema = SchemaFactory.createForClass(Music);