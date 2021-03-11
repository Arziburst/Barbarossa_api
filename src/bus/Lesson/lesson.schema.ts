
// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

// Schemas
import { Test } from '../Test/test.schema';

@ObjectType()
@Schema()
export class Lesson {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => Number)
    @Prop()
    lessonNumber: number;

    @Field(() => String, { nullable: true })
    @Prop()
    title: string;

    @Field(() => String, { nullable: true })
    @Prop()
    description: string;

    @Field(() => [ Test ])
    @Prop({ type: [ MongooseSchema.Types.ObjectId ], ref: 'Test' })
    tests: MongooseSchema.Types.ObjectId[];
}

export type LessonDocument = Lesson & Document;

export const LessonSchema = SchemaFactory.createForClass(Lesson);
