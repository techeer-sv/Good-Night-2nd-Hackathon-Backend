import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './domain/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private MovieRepository: Repository<Movie>,
  ) {}

  async create(CreateMovieDto: CreateMovieDto) {
    console.log(CreateMovieDto.title);
    return await this.MovieRepository.save(CreateMovieDto);
  }

  async delete(id: number) {
    const result = await this.MovieRepository.softDelete(id);
    if (result.affected == 0) throw new NotFoundException('존재하지 않는 영화입니다.');
  }
  getHello(): string {
    return '영화 테스트 입니다.';
  }
}
