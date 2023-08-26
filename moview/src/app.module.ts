import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), MovieModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
