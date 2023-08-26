import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/req/create-movie.dto';
import { UpdateMovieDto } from './dto/req/update-movie.dto';

@Controller('api/v1/movies')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get(':id')
  searchMovie(@Param('id') id: number) {
    return this.appService.search(id);
  }

  @Post() // 영화 등록
  @UsePipes(new ValidationPipe())
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    console.log(createMovieDto.title);
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
