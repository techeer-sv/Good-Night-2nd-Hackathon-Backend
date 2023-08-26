import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { Review } from "src/reviews/entities/reviews.entity";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  @InjectRepository(Review)
  private readonly reviewRepository: Repository<Review>;

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

  async updateMovie(
    id: number,
    movieData: Partial<Movie>
  ): Promise<Movie | undefined> {
    const existingMovie = await this.movieRepository.findOne({ where: { id } });

    if (!existingMovie) {
      return undefined;
    }

    Object.assign(existingMovie, movieData);
    const updatedMovie = await this.movieRepository.save(existingMovie);

    return updatedMovie;
  }

  async deleteMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException("영화를 찾을 수 없습니다.");
    }

    await this.movieRepository.remove(movie);

    return movie;
  }

  async createReview(
    movieId: number,
    rating: number,
    content: string
  ): Promise<Review> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException("Movie not found");
    }

    const review = new Review();
    review.rating = rating;
    review.content = content;
    review.movie = movie;

    return this.reviewRepository.save(review);
  }
}
