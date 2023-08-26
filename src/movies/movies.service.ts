import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseDto, ResponseWithoutDataDto } from 'src/common/respone.dto';
import {
  CreateMovieResultDto,
  DeleteMovieResultDto,
  MovieResultDto,
  UpdateMovieResultDto,
} from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    // 정해진 영화 장르가 아니면 에러 발생
    if (!['스릴러', '로맨스', '코믹', '액션'].includes(createMovieDto.genre)) {
      throw new NotFoundException('영화 장르가 잘못되었습니다.');
    }

    //title이 Null이면 에러 발생
    if (!createMovieDto.title) {
      throw new NotFoundException('영화 제목이 잘못되었습니다.');
    }

    const res = await this.movieRepository.save(createMovieDto);

    const data = plainToInstance(CreateMovieResultDto, res);

    return plainToInstance(ResponseDto<CreateMovieDto>, {
      code: '200',
      message: 'success',
      data: data,
    });
  }

  async findAll() {
    // 삭제된 영화는 보여주지 않는다
    const res = await this.movieRepository.find({
      where: { deletedAt: null },
    });

    const data = res.map((movie) => plainToInstance(MovieResultDto, movie));

    return plainToInstance(ResponseDto<MovieResultDto[]>, {
      code: '200',
      message: 'success',
      data: data,
    });
  }

  async findOne(id: number) {
    const res = await this.movieRepository.findOne({ where: { id } });

    if (!res) {
      // nestjs 제공하는 예외처리
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    const data = plainToInstance(MovieResultDto, res);

    return plainToInstance(ResponseDto<MovieResultDto>, {
      code: '200',
      message: 'success',
      data: data,
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    // 정해진 영화 장르가 아니면 에러 발생
    if (!['스릴러', '로맨스', '코믹', '액션'].includes(updateMovieDto.genre)) {
      throw new NotFoundException('영화 장르가 잘못되었습니다.');
    }

    //title이 Null이면 에러 발생
    if (!updateMovieDto.title) {
      throw new NotFoundException('영화 제목이 잘못되었습니다.');
    }

    const res = await this.movieRepository.update(id, updateMovieDto);

    if (!res.affected) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    return plainToInstance(ResponseWithoutDataDto, {
      code: '200',
      message: 'success',
    });
  }

  async remove(id: number) {
    const res = await this.movieRepository.softDelete(id);

    //TODO: soft delete를 하다보니 삭제된 영화가 계속 조회된다.
    if (!res.affected) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }
    // soft delete
    return plainToInstance(ResponseWithoutDataDto, {
      code: '200',
      message: 'success',
    });
    // db에서 완전히 삭제
    // return this.movieRepository.delete(id);
  }

  // 하나의 API에서 전체 조회와 장르, 현재 상영중 여부 조건을 선택하여 조회 (쿼리 파라미터)
  async findWithQuery(isShowing: string, genre: string) {
    // 삭제된 영화는 보여주지 않는다
    console.log(isShowing, genre);
    const res = await this.movieRepository.find({
      where: {
        deletedAt: null,
        genre,
        isShowing: isShowing === 'true',
      },
      order: { releaseDate: 'ASC' },
    });

    const data = res.map((movie) => plainToInstance(MovieResultDto, movie));

    return plainToInstance(ResponseDto<MovieResultDto[]>, {
      code: '200',
      message: 'success',
      data: data,
    });
  }
}
