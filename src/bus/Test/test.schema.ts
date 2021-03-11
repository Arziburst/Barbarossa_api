// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Schemas
import { Lesson } from '../Lesson/lesson.schema';

@ObjectType()
@Schema()
export class Test {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => Number)
    @Prop()
    testNumber: number;

    @Field(() => String, { nullable: true })
    @Prop()
    title?: string;

    @Field(() => String, { nullable: true })
    @Prop()
    description?: string;

    @Field(() => [ Lesson ])
    @Prop({ type: [ MongooseSchema.Types.ObjectId ], ref: 'Lesson' })
    lessons: MongooseSchema.Types.ObjectId[];
}

export type TestDocument = Test & Document;

export const TestSchema = SchemaFactory.createForClass(Test);
