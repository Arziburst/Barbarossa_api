// Core
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

// Services
import { TestService } from './test.service';
import { LessonService } from '../Lesson/lesson.service';

// Inputs
import { CreateTestInput, UpdateTestInput } from './test.inputs';

// Schemas
import { Test, TestDocument } from './test.entity';
import { CreateTestOutput } from './test.outputs';

@Resolver(() => Test)
export class TestsResolver {
    constructor(
        private readonly testService: TestService,
        @Inject(LessonService)
        private readonly lessonService: LessonService,
    ) {}

    @Query(() => [ Test ])
    async tests() {
        const tests = await this.testService.findAll();

        return tests;
    }

    @Mutation(() => CreateTestOutput)
    async createTest(@Args('input') input: CreateTestInput): Promise<CreateTestOutput> {
        const createdTest = await this.testService.createOne(input);
        const findedLessonById = await this.lessonService.findById(input.lessonId);
        const updatedLesson = await this.lessonService.updateOne({
            _id:   input.lessonId,
            tests: [ ...findedLessonById!.tests, createdTest._id ],
        });

        return {
            updatedLesson,
            createdTest,
        };
    }

    @Mutation(() => Test)
    async updateTest(@Args('input') input: UpdateTestInput) {
        return await this.testService.updateOne(input);
    }

    @ResolveField()
    async lesson(@Parent() test: TestDocument, @Args('populate') populate: Boolean) {
        if (populate) {
            await test
                .populate({ path: 'lesson', model: 'Lesson' })
                .execPopulate();
        }

        return test.lesson;
    }
}
