import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MovieModule } from '../movie/movie.module';
import { DatabaseModule } from '../config/database.module';
import { reviewProviders } from './review.providers';
import { movieProviders } from '../movie/movie.providers';

@Module({
  imports: [DatabaseModule, MovieModule],
  controllers: [ReviewController],
  providers: [...reviewProviders, ...movieProviders, ReviewService],
})
export class ReviewModule {}
