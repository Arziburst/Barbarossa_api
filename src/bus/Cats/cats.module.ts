// Core
import { Module } from '@nestjs/common';
import { CatsResolver } from './cats.resolver';
import { MongooseModule } from '@nestjs/mongoose';

// Tools
import { CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name:   'Cat',
                schema: CatSchema,
            },
        ]),
    ],
    providers: [
        CatsResolver,
        CatsService,
    ],
})
export class CatsModule {}
