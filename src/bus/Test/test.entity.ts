// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

// Schemas
import { Lesson } from '../Lesson/lesson.entity';

@ObjectType()
@Schema()
export class Test {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => Number)
    @Prop()
    testNumber: number;

    @Field(() => String, { nullable: true })
    @Prop()
    title?: string;

    @Field(() => String, { nullable: true })
    @Prop()
    description?: string;

    @Field(() => Lesson)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Lesson' })
    lesson: ObjectId;
}

export type TestDocument = Test & Document;

export const TestSchema = SchemaFactory.createForClass(Test);
