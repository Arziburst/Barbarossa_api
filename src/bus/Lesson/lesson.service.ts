// Core
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Input
import { LessonCreateInput, UpdateLessonInput } from './lesson.inputs';

import { Lesson, LessonDocument } from './lesson.entity';

@Injectable()
export class LessonService {
    constructor(@InjectModel('Lesson') private readonly lessonModel: Model<LessonDocument>) {}

    async createOne(input: LessonCreateInput): Promise<Lesson> {
        const newLesson = new this.lessonModel(input);

        return await newLesson.save();
    }

    async findAll(): Promise<Lesson[]> {
        const lessons = await this.lessonModel
            .find()
            .exec();

        return lessons;
    }

    async findById(lessonId: ObjectId): Promise<Lesson | null> {
        const lesson = await this.lessonModel
            .findById(lessonId)
            .exec();

        return lesson;
    }

    async updateOne(input: UpdateLessonInput): Promise<Lesson | null> {
        const updatedLesson = await this.lessonModel
            .findByIdAndUpdate(input._id, input, { new: true })
            .exec();

        return updatedLesson;
    }
}
