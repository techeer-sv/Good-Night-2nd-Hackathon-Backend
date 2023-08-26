import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Get,
  NotFoundException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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

  @Get(':id')
  async getMovieById(@Param('id') id: number): Promise<Movie> {
    const movie = await this.movieService.getMovieById(id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  @Get()
  async getMovies(
    @Query('genre') genre: string,
    @Query('isShowing') isShowing: boolean,
  ): Promise<Movie[]> {
    let movies: Movie[];

    if (genre && isShowing !== undefined) {
      movies = await this.movieService.getMoviesByGenreAndShowing(
        genre,
        isShowing,
      );
    } else if (genre) {
      movies = await this.movieService.getMoviesByGenre(genre);
    } else if (isShowing !== undefined) {
      movies = await this.movieService.getMoviesByShowing(isShowing);
    } else {
      movies = await this.movieService.getAllMovies();
    }

    return movies;
  }

  @Get('/rating')
  async getMoviesByRating(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(10), ParseIntPipe)
    itemsPerPage: number,
  ): Promise<{ movies: Movie[]; total: number }> {
    return this.movieService.getMoviesByRating(page, itemsPerPage);
  }
}
