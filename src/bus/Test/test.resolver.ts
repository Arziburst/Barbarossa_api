// Core
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

// Services
import { TestService } from './test.service';
import { LessonService } from '../Lesson/lesson.service';

// Inputs & outputs
import { CreateTestInput, UpdateTestInput, TestsOfLessonInput } from './test.inputs';
import { CreateTestOutput } from './test.outputs';

// Schemas
import { Test, TestDocument } from './test.entity';

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

    @Query(() => [ Test ])
    async testsOfLesson(@Args('input') input: TestsOfLessonInput): Promise<Test[]> {
        const testsOfLesson = await this.testService.findTestsOfLesson(input);

        return testsOfLesson;
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
            await test.populate({ path: 'lesson', model: 'Lesson' });
        }

        return test.lesson;
    }
}
