// Core
import { Field, InputType, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { IsString, IsNumber, IsOptional, MinLength, IsMongoId } from 'class-validator';

@InputType()
export class LessonCreateInput {
    @Field()
    @IsNumber()
    lessonNumber: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    description?: string;
}

@InputType()
export class UpdateLessonInput {
    @Field(() => ID)
    @IsMongoId()
    _id: ObjectId;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    lessonNumber?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(3)
    description?: string;

    /* ---------------------- RELATIONS ---------------------- */
    @Field(() => [ String ], { nullable: true })
    tests?: ObjectId[];
}
