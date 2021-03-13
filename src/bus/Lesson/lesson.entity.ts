
// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

// Schemas
import { Test } from '../Test/test.entity';

@ObjectType()
@Schema()
export class Lesson {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => Number)
    @Prop({ unique: true })
    lessonNumber: number;

    @Field(() => String, { nullable: true })
    @Prop()
    title: string;

    @Field(() => String, { nullable: true })
    @Prop()
    description: string;

    @Field(() => [ Test ])
    @Prop({ type: [ MongooseSchema.Types.ObjectId ], ref: 'Test' })
    tests: ObjectId[];
}

export type LessonDocument = Lesson & Document;

export const LessonSchema = SchemaFactory.createForClass(Lesson);
