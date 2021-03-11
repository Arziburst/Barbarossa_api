// Core
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Input
import { CreateTestInput, UpdateTestInput } from './test.inputs';

import { Test, TestDocument } from './test.schema';

@Injectable()
export class TestService {
    constructor(@InjectModel('Test') private readonly testModel: Model<TestDocument>) {}

    async createOne(input: CreateTestInput): Promise<Test> {
        const newTest = new this.testModel(input);

        return await newTest.save();
    }

    async findAll(): Promise<Test[]> {
        const tests = await this.testModel.find().exec();

        return tests;
    }

    async updateOne(input: UpdateTestInput): Promise<Test | null> {
        const updatedTest = await this.testModel
            .findByIdAndUpdate(input._id, input, { new: true, useFindAndModify: false })
            .exec();

        return updatedTest;
    }
}