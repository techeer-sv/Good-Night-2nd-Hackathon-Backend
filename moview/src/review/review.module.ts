import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './domain/review.entity';
import {Movie} from "../movie/domain/movie.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Movie])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
