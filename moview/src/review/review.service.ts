import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './domain/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Movie } from '../movie/domain/movie.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private ReviewRepository: Repository<Review>,
    @InjectRepository(Movie)
    private MovieRepository: Repository<Movie>,
  ) {}

  async create(id: number, createReviewDto: CreateReviewDto) {
    const movie = await this.MovieRepository.findOne({
      where: { id: id },
    });
    if (!movie) throw new NotFoundException('존재하지 않는 영화입니다.');
    const review = new Review();
    review.score = createReviewDto.score;
    review.review = createReviewDto.review;
    review.movie = movie;
    return await this.ReviewRepository.save(review);
  }
}
