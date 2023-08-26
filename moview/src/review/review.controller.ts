import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('api/v1/reviews')
export class ReviewController {
  constructor(private readonly appService: ReviewService) {}

  @Post(':id')
create(@Param('id') id: number ,@Body() createReviewDto: CreateReviewDto) {
    return this.appService.create(id, createReviewDto);
  }

  @Get(':id')
  searchAll(@Param('id') id: number, @Query('score') score: string) {
    return this.appService.searchAll(id, score);
  }
}
