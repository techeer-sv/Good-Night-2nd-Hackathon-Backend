import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entiity';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Get()
  async findAll(
    @Query('genre') genre: string,
    @Query('isShowing') isShowing: boolean,
  ): Promise<Movie[]> {
    return await this.movieService.findAll(genre, isShowing);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.findOne(id);
  }
}
