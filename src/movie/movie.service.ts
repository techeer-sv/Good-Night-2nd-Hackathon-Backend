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

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({
      order: { releaseDate: 'ASC' },
    });
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { genre },
      order: { releaseDate: 'ASC' },
    });
  }

  async getMoviesByShowing(isShowing: boolean): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { isShowing },
      order: { releaseDate: 'ASC' },
    });
  }

  async getMoviesByGenreAndShowing(
    genre: string,
    isShowing: boolean,
  ): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      where: { genre, isShowing },
      order: { releaseDate: 'ASC' },
    });

    return movies;
  }

  async getMoviesByRating(
    page: number = 1,
    itemsPerPage: number = 10,
  ): Promise<{ movies: Movie[]; total: number }> {
    const [movies, total] = await this.movieRepository
      .createQueryBuilder('movie')
      .select([
        'movie.id',
        'movie.title',
        'movie.genre',
        'movie.releaseDate',
        'movie.endDate',
        'movie.isShowing',
      ])
      .addSelect('AVG(review.rating)', 'avgRating') // avgRating을 추가적인 SELECT 열로 지정
      .leftJoin('movie.reviews', 'review')
      .groupBy('movie.id')
      .orderBy('avgRating', 'DESC')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    return { movies, total };
  }
}
