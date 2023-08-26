import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/req/create-movie.dto';
import { UpdateMovieDto } from './dto/req/update-movie.dto';
import { isBooleanObject } from 'util/types';

@Controller('api/v1/movies')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get()
  searchMovies(@Query() query: { status: string; genre: string }) {
    console.log(isBooleanObject(query.status));
    return this.appService.searchAll(query.status, query.genre);
  }

  @Get(':id')
  searchMovie(@Param('id') id: number) {
    return this.appService.search(id);
  }

  @Post() // 영화 등록
  @UsePipes(new ValidationPipe())
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.appService.create(createMovieDto);
  }

  @Delete(':id') // 영화 삭제
  deleteMovie(@Param('id') id: number) {
    return this.appService.delete(id);
  }

  @Put(':id')
  updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.appService.update(id, updateMovieDto);
  }
}
