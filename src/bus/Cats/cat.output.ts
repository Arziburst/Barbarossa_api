// Core
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CatGqlOutput {
    @Field(() => ID)
    _id: string;

    @Field()
    name: string;

    @Field(() => Int)
    age: number;
}
