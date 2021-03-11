// Core
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Input
import { CatInput } from './cat.input';

import { ICat } from './cats.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel('Cat') private readonly catModel: Model<ICat>) {}

    async createOne(input: CatInput): Promise<ICat> {
        const createdCat = new this.catModel(input);

        return await createdCat.save();
    }

    async findAll(): Promise<ICat[]> {
        const cats = await this.catModel.find().exec();

        return cats;
    }
}
