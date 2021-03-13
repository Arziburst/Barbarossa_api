// Core
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { LessonModule } from '../Lesson/lesson.module';

// Tools
import { TestSchema } from './test.entity';
import { TestsResolver } from './test.resolver';
import { TestService } from './test.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }]),
        forwardRef(() => LessonModule),
    ],
    providers: [ TestsResolver, TestService ],
    exports:   [ TestService ],
})
export class TestModule {}
