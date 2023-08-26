import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('api/v1/movie')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get() // 영화 등록
  getHello(): string {
    return this.appService.getHello();
  }
}
