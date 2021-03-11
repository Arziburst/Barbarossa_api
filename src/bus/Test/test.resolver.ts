// Core
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

// Tools
import { TestService } from './test.service';

// Inputs
import { CreateTestInput, UpdateTestInput } from './test.inputs';

// Schemas
import { Test, TestDocument } from './test.schema';

@Resolver(() => Test)
export class TestsResolver {
    constructor(private readonly testService: TestService) {}

    @Query(() => [ Test ])
    async tests() {
        const tests = await this.testService.findAll();

        return tests;
    }

    @Mutation(() => Test)
    async createTest(@Args('input') input: CreateTestInput) {
        const newTest = await this.testService.createOne(input);

        return newTest;
    }

    @Mutation(() => Test)
    async updateTest(@Args('input') input: UpdateTestInput) {
        return await this.testService.updateOne(input);
    }

    @ResolveField()
    async lessons(@Parent() test: TestDocument) {
        await test
            .populate({ path: 'lessons', model: 'Lesson' })
            .execPopulate();

        return test.lessons;
    }
}
