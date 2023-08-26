import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async getOneMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException("영화를 찾을 수 없습니다.");
    }
    return movie;
  }

  async getFilteredAndSortedMovies(
    genre: string,
    isShowing: boolean
  ): Promise<Movie[]> {
    let query = this.movieRepository.createQueryBuilder("movie");

    if (genre) {
      query = query.andWhere("movie.genre = :genre", { genre });
    }

    if (isShowing !== undefined) {
      query = query.andWhere("movie.isShowing = :isShowing", { isShowing });
    }

    query = query.orderBy("movie.releaseDate", "DESC"); // 개봉일 내림차순 정렬

    const movies = await query.getMany();
    return movies;
  }

  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException("영화를 찾을 수 없습니다.");
    }

    await this.movieRepository.remove(movie);

    return movie;
  }
}
