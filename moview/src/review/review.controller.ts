import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('api/v1/review')
export class ReviewController {
  constructor(private readonly appService: ReviewService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
