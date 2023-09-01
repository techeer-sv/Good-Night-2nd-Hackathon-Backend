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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: '영화 생성' })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: '영화 목록 조회' })
  async findAll(
    @Query('genre') genre: string,
    @Query('isShowing') isShowing: boolean,
  ): Promise<Movie[]> {
    return await this.movieService.findAll(genre, isShowing);
  }

  @Get(':id')
  @ApiOperation({ summary: '영화 상세 조회' })
  async findOne(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '영화 수정' })
  async update(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '영화 삭제' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.movieService.delete(id);
  }
}
