import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entiity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) // movie entity와 관련된 작업을 할 수 있는 repository 객체 생성
    private movieRepository: Repository<Movie>, // 주입받은 리포지토리를 movieRepository라는 이름의 프라이빗 인스턴스 변수로 저장
  ) {}

  async create(movie: Movie): Promise<Movie> {
    if (!movie.title) {
      throw new Error('영화 제목을 입력해주세요.');
    }
    return await this.movieRepository.save(movie);
  }
}
