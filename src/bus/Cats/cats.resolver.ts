// Core
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// Tools
import { CatsService } from './cats.service';

// Inputs
import { CatInput } from './cat.input';

// Output
import { CatGqlOutput } from './cat.output';

@Resolver()
export class CatsResolver {
    constructor(private readonly catsService: CatsService) {}

    @Query(() => [ CatGqlOutput ])
    async cats() {
        const cats = await this.catsService.findAll();

        return cats;
    }

    @Mutation(() => CatGqlOutput)
    async createCat(@Args('input') input: CatInput) {
        const newCat = await this.catsService.createOne(input);

        return newCat;
    }
}
