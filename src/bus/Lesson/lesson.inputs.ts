// Core
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

// Schemas
// import { Test } from '../Test/test.schema';

@InputType()
export class LessonCreateInput {
    @Field(() => Int)
    lessonNumber: number;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;
}

@InputType()
export class UpdateLessonInput {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => Int, { nullable: true })
    lessonNumber?: number;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => [ String ], { nullable: true })
    tests?: MongooseSchema.Types.ObjectId[];
}
