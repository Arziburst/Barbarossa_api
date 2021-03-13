// Core
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { Test } from './test.entity';
import { Lesson } from '../Lesson/lesson.entity';

@ObjectType()
export class CreateTestOutput {
    @Field(() => Lesson)
    updatedLesson: Lesson | null;

    @Field(() => Test)
    createdTest: Test;
}
