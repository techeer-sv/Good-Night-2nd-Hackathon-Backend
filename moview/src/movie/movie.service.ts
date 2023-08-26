import { CreateMovieDto } from './dto/req/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './domain/movie.entity';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/req/update-movie.dto';
import { GetMovieDto } from './dto/res/get-movie.dto';
import { plainToInstance } from 'class-transformer';

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

  async update(id: number, updateMovie: UpdateMovieDto) {
    const result = await this.MovieRepository.update(id, updateMovie);
    if (result.affected == 0) throw new NotFoundException('존재하지 않는 영화입니다.');
  }

  async search(id: number) {
    const result = await this.MovieRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) throw new NotFoundException('존재하지 않는 영화입니다.');
    const getMovieDto = new GetMovieDto();

    getMovieDto.title = result.title;
    getMovieDto.genre = result.genre;
    getMovieDto.endDate = result.endDate.toISOString();
    getMovieDto.releaseDate = result.releaseDate.toISOString();
    getMovieDto.releaseStatus = result.releaseStatus;

    return getMovieDto;
  }

  async searchAll(status: string, genre: string) {
    const nStatus = status === 'true';
    const result = await this.MovieRepository.find({
      where: { releaseStatus: nStatus, genre: genre },
      order: { releaseDate: 'ASC' },
    });
    const nResult = result.map((v) => plainToInstance(GetMovieDto, v));
    console.log(nResult);
    return nResult;
  }
}
