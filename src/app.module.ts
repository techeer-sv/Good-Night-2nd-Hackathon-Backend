import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { databaseProviders } from './config/database.providers';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [MovieModule, ReviewModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
