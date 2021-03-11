import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cat {
    @Prop()
    name: string;

    @Prop()
    age: number;
}

export type ICat = Cat & Document;

export const CatSchema = SchemaFactory.createForClass(Cat);
