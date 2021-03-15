// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';

// Graphql
import { LessonModule } from './bus/Lesson/lesson.module';
import { TestModule } from './bus/Test/test.module';

// REST
// import ...

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphqlModule,
        LessonModule,
        TestModule,
    ],
})
export class AppModule {}
