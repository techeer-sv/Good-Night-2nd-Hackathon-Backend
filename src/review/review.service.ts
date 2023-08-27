import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from '../movie/movie.entity';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

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
    const queryRunner =
      this.reviewRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const movie = await this.movieRepository.findOne({
        where: { id: movieId },
        relations: ['reviews'],
      });
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      const review = this.reviewRepository.create({ rating, content, movie });
      const newReview = await queryRunner.manager.save(Review, review);

      const totalRating = movie.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      if (movie.reviews.length === 0) {
        movie.averageRating = rating;
      } else {
        movie.averageRating = totalRating / movie.reviews.length;
      }

      movie.reviews.push(newReview);

      await queryRunner.manager.save(Movie, movie);

      await queryRunner.commitTransaction();

      this.logger.log(`Review created successfully: ${newReview.id}`);
      return newReview;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error creating review: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
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
