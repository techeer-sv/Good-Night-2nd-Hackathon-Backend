import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entity/movie.entiity';
import { UpdateMovieDto } from './dto/update-movie.dto';

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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.movieService.delete(id);
  }
}
