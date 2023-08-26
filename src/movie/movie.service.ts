import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
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
}
