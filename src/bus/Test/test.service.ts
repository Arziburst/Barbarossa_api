// Core
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Input
import { CreateTestInput, TestsOfLessonInput, UpdateTestInput } from './test.inputs';

import { Test, TestDocument } from './test.entity';

@Injectable()
export class TestService {
    constructor(@InjectModel('Test') private readonly testModel: Model<TestDocument>) {}

    async createOne(input: CreateTestInput): Promise<Test> {
        const newTest = new this.testModel({
            ...input,
            lesson: input.lessonId,
        });

        return await newTest.save();
    }

    async findAll(): Promise<Test[]> {
        const tests = await this.testModel.find().exec();

        return tests;
    }

    async findTestsOfLesson({ lessonId }: TestsOfLessonInput): Promise<Test[]> {
        const tests = await this.testModel.find({ lesson: lessonId }).exec();

        return tests;
    }

    async updateOne(input: UpdateTestInput): Promise<Test | null> {
        const updatedTest = await this.testModel
            .findByIdAndUpdate(input._id, input, { new: true })
            .exec();

        return updatedTest;
    }

    async findOneAndRemove(testId: ObjectId): Promise<boolean> {
        await this.testModel.findOneAndRemove({ _id: testId });

        return true;
    }
}
