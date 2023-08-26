import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() movieData: Partial<Movie>): Promise<Movie> {
    if (!movieData.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }

    return this.movieService.createMovie(movieData);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    await this.movieService.deleteMovie(id);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: number,
    @Body() movieData: Partial<Movie>,
  ): Promise<Movie> {
    return this.movieService.updateMovie(id, movieData);
  }
}
