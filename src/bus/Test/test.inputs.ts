import { Field, InputType, Int, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTestInput {
    @Field(() => Int)
    testNumber: number;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => ID)
    lessonId: MongooseSchema.Types.ObjectId
}

@InputType()
export class UpdateTestInput {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => Int, { nullable: true })
    testNumber?: number;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => [ String ], { nullable: true })
    lessons?: MongooseSchema.Types.ObjectId[];
}
