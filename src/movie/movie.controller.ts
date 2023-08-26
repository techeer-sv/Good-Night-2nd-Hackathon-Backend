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
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { PostPutMovieDto } from '../dto/movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() movieData: PostPutMovieDto): Promise<Movie> {
    if (!movieData.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }

    return this.movieService.createMovie(movieData);
  }

  @Get()
  async getMovies(
    @Query('genre') genre?: string,
    @Query('isShowing') isShowing?: string,
  ): Promise<Movie[]> {
    let movies: Movie[];
    const isShowingBool = isShowing === 'true';
    if (genre && isShowing !== undefined) {
      movies = await this.movieService.getMoviesByGenreAndShowing(
        genre,
        isShowingBool,
      );
    } else if (genre) {
      movies = await this.movieService.getMoviesByGenre(genre);
    } else if (isShowing !== undefined) {
      movies = await this.movieService.getMoviesByShowing(isShowingBool);
    } else {
      movies = await this.movieService.getAllMovies();
    }

    return movies;
  }

  @Get('rating')
  async getMoviesByRate(
    @Query('page') page: number,
    @Query('itemsPerPage')
    itemsPerPage: number,
  ): Promise<{ movies: Movie[]; total: number }> {
    return this.movieService.getMoviesByRating(page, itemsPerPage);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    await this.movieService.deleteMovie(id);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: number,
    @Body() movieData: PostPutMovieDto,
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
}
