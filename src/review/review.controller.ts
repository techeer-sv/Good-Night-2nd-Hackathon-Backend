import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: '리뷰 생성' })
  @HttpCode(200)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<void> {
    await this.reviewService.create(createReviewDto);
  }

  @Get('/:movieId')
  @ApiOperation({ summary: '리뷰 목록 조회' })
  async findReviewsByMovieId(
    @Param('movieId') movieId: number,
  ): Promise<Review[]> {
    return await this.reviewService.findReviewsByMovieId(movieId);
  }
}
