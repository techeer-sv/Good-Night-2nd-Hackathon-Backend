import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = new Movie();

    movie.title = createMovieDto.title;
    movie.genre = createMovieDto.genre;
    movie.releaseDate = createMovieDto.releaseDate;
    movie.endDate = createMovieDto.endDate;
    movie.isShowing = createMovieDto.isShowing;

    return await this.movieRepository.save(movie);
  }

  async findAll() {
    // 삭제된 영화는 보여주지 않는다
    const movies = await this.movieRepository.find({
      where: { deletedAt: null },
    });

    return movies;
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      releaseDate: movie.releaseDate,
      endDate: movie.endDate,
    };

    return newMovie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: number) {
    // soft delete
    return this.movieRepository.softDelete(id);
    // db에서 완전히 삭제
    // return this.movieRepository.delete(id);
  }
}
