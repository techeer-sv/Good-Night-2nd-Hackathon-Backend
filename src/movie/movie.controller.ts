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

    const currentDate = new Date();
    const releaseDate = new Date(movieData.releaseDate);
    const endDate = new Date(movieData.endDate);

    const currentDateString = currentDate.toISOString().split('T')[0];
    const releaseDateString = releaseDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    const isShowing =
      releaseDateString <= currentDateString &&
      currentDateString <= endDateString;

    return this.movieService.createMovie({ ...movieData, isShowing });
  }

  @Get()
  async getMovies(
    @Query('genre') genre?: string,
    @Query('isShowing') isShowing?: string,
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ): Promise<{ movies: Movie[]; total: number }> {
    let movies: Movie[];
    const isShowingBool = isShowing === 'true';
    let total = 0; // 총 영화 개수

    if (genre && isShowing !== undefined) {
      const result = await this.movieService.getMoviesByGenreAndShowing(
        genre,
        isShowingBool,
        page,
        itemsPerPage,
      );
      movies = result.movies;
      total = result.total;
    } else if (genre) {
      const result = await this.movieService.getMoviesByGenre(
        genre,
        page,
        itemsPerPage,
      );
      movies = result.movies;
      total = result.total;
    } else if (isShowing !== undefined) {
      const result = await this.movieService.getMoviesByShowing(
        isShowingBool,
        page,
        itemsPerPage,
      );
      movies = result.movies;
      total = result.total;
    } else {
      const result = await this.movieService.getAllMovies(page, itemsPerPage);
      movies = result.movies;
      total = result.total;
    }

    return { movies, total }; // 영화 목록과 총 개수를 함께 반환
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
