// Core
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

// Tools
import { LessonService } from './lesson.service';

// Schemas
import { Lesson, LessonDocument } from './lesson.entity';

// Inputs
import { LessonCreateInput, UpdateLessonInput } from './lesson.inputs';

@Resolver(() => Lesson)
export class LessonsResolver {
    constructor(private readonly lessonService: LessonService) {}

    @Query(() => [ Lesson ])
    async lessons() {
        const lessons = await this.lessonService.findAll();

        return lessons;
    }

    @Mutation(() => Lesson)
    async createLesson(@Args('input') input: LessonCreateInput) {
        const newLesson = await this.lessonService.createOne(input);

        return newLesson;
    }

    @Mutation(() => Lesson)
    async updateLesson(@Args('input') input: UpdateLessonInput) {
        return await this.lessonService.updateOne(input);
    }

    @ResolveField()
    async tests(@Parent() lesson: LessonDocument, @Args('populate') populate: Boolean = false) {
        if (populate) {
            await lesson
                .populate({ path: 'tests', model: 'Test' });
        }

        return lesson.tests;
    }
}
