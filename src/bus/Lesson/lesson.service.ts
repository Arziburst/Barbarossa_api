// Core
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Input
import { LessonCreateInput, UpdateLessonInput } from './lesson.inputs';

import { Lesson, LessonDocument } from './lesson.schema';

@Injectable()
export class LessonService {
    constructor(@InjectModel('Lesson') private readonly lessonModel: Model<LessonDocument>) {}

    async createOne(input: LessonCreateInput): Promise<Lesson> {
        const newLesson = new this.lessonModel(input);

        return await newLesson.save();
    }

    async findAll(): Promise<Lesson[]> {
        const lessons = await this.lessonModel.find().exec();

        return lessons;
    }

    async updateOne(input: UpdateLessonInput): Promise<Lesson | null> {
        const updatedLesson = await this.lessonModel
            .findByIdAndUpdate(input._id, input, { new: true, useFindAndModify: false })
            .exec();

        return updatedLesson;
    }
}
