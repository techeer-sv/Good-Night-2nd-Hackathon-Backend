import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from '../movie/movie.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: Repository<Review>,
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async createReview(
    movieId: number,
    rating: number,
    content: string,
  ): Promise<Review> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['reviews'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const review = this.reviewRepository.create({ rating, content, movie });
    const newReview = await this.reviewRepository.save(review);

    const totalRating = movie.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    movie.averageRating = totalRating / movie.reviews.length;
    await this.movieRepository.save(movie);

    return newReview;
  }

  async getMovieReviews(
    movieId: number,
    minRating?: number,
  ): Promise<Review[]> {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.movie', 'movie')
      .where('movie.id = :movieId', { movieId })
      .orderBy('review.createdAt', 'DESC');

    if (minRating !== undefined) {
      queryBuilder.andWhere('review.rating >= :minRating', { minRating });
    }

    return queryBuilder.getMany();
  }
}
