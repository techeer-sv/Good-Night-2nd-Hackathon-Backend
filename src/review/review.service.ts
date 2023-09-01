import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { Repository } from 'typeorm';
import { MovieService } from '../movie/movie.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private movieService: MovieService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = new Review();
    review.rating = createReviewDto.rating;
    review.comment = createReviewDto.comment;
    review.movie = await this.movieService.findOne(createReviewDto.movieId);

    if (review.rating % 0.5 !== 0) {
      throw new Error('평점은 0.5점 단위로 입력해주세요.');
    }

    if (!review.movie) {
      throw new Error('영화 정보가 없습니다.');
    }

    return await this.reviewRepository.save(review);
  }

  async findReviewsByMovieId(movieId: number): Promise<Review[]> {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .where('review.movieId = :movieId', { movieId })
      .orderBy('review.createdAt', 'DESC')
      .getMany();
  }
}
