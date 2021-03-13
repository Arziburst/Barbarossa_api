// Core
import { forwardRef, Module } from '@nestjs/common';
import { LessonsResolver } from './lesson.resolver';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { TestModule } from '../Test/test.module';

// Tools
import { LessonSchema } from './lesson.entity';
import { LessonService } from './lesson.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]),
        forwardRef(() => TestModule),
    ],
    providers: [ LessonsResolver, LessonService ],
    exports:   [ LessonService ],
})
export class LessonModule {}
