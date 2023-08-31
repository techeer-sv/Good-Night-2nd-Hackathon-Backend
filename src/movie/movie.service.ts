import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    await this.movieRepository.softDelete(id);
  }

  async updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movieData);
    return this.movieRepository.findOneBy({ id });
  }

  async getMovieById(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  async getAllMovies(
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .orderBy('releaseDate', 'ASC')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }

  async getMoviesByGenre(
    genre: string,
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .where({ genre })
      .orderBy('releaseDate', 'ASC')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }

  async getMoviesByShowing(
    isShowing: boolean,
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .where({ isShowing })
      .orderBy('releaseDate', 'ASC')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }

  async getMoviesByGenreAndShowing(
    genre: string,
    isShowing: boolean,
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .where({ genre, isShowing })
      .orderBy('releaseDate', 'ASC')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }

  async getMoviesByRating(
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }
}
