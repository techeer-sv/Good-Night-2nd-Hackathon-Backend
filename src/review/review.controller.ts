import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<void> {
    await this.reviewService.create(createReviewDto);
  }

  @Get('/:movieId')
  async findReviewsByMovieId(
    @Param('movieId') movieId: number,
  ): Promise<Review[]> {
    return await this.reviewService.findReviewsByMovieId(movieId);
  }
}
