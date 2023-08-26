import { Body, Controller, Delete, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('api/v1/movie')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  // @Get() // 영화 등록
  // getHello(): string {
  //   return this.appService.getHello();
  // }

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
