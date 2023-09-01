import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entiity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) // movie entity와 관련된 작업을 할 수 있는 repository 객체 생성
    private movieRepository: Repository<Movie>, // 주입받은 리포지토리를 movieRepository라는 이름의 프라이빗 인스턴스 변수로 저장
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, genre, releaseDate, endDate, isShowing } = createMovieDto;

    if (!title) {
      throw new Error('영화 제목을 입력해주세요.');
    }

    const movie = new Movie();
    movie.title = title;
    movie.genre = genre;
    movie.releaseDate = releaseDate;
    movie.endDate = endDate;
    movie.isShowing = isShowing;

    return await this.movieRepository.save(movie);
  }

  async findAll(genre?: string, isShowing?: boolean): Promise<Movie[]> {
    const query = this.movieRepository
      .createQueryBuilder('movie')
      .orderBy('movie.releaseDate', 'ASC');

    if (genre) {
      query.andWhere('movie.genre = :genre', { genre });
    }

    if (isShowing) {
      query.andWhere('movie.isShowing = :isShowing', { isShowing });
    }
    return await query.getMany();
  }

  async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.movieRepository.update(id, {
      ...updateMovieDto,
      updatedAt: new Date(),
    });
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.softDelete(id);
  }
}
