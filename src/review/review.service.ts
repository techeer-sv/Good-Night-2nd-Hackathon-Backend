import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from '../movie/movie.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async createReview(
    movieId: number,
    rating: number,
    content: string,
  ): Promise<Review> {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const review = this.reviewRepository.create({ rating, content, movie });
    return this.reviewRepository.save(review);
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
