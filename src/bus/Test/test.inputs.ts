import { Field, InputType, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { IsString, IsNumber, IsOptional, MinLength, IsMongoId } from 'class-validator';

@InputType()
export class CreateTestInput {
    @Field(() => Int)
    @IsNumber()
    testNumber: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    description?: string;

    @Field(() => String)
    @IsMongoId()
    lessonId: ObjectId
}

@InputType()
export class UpdateTestInput {
    @Field(() => ID)
    @IsMongoId()
    _id: ObjectId;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    testNumber?: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @MinLength(3)
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @MinLength(3)
    description?: string;

    @Field(() => String, { nullable: true })
    lessons?: ObjectId;
}
@InputType()
export class TestsOfLessonInput {
    @Field(() => ID)
    @IsMongoId()
    lessonId: ObjectId;
}
