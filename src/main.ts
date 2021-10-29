// Core
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// App
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') ?? 4000;

    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: [
            'http://localhost',
            'http://localhost:3000', // dev
            'http://localhost:5000', // dev
            'http://localhost:5500', // dev
            'https://barbarossa.pp.ua', // prod
            'https://studio.apollographql.com',
        ],
        credentials: true,
    });

    await app.listen(port);

    Logger.log(`🚀 Graphql server running on http://localhost:${port}/graphql`, 'NestApplication');
}

bootstrap();
