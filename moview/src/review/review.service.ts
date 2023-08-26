import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './domain/review.entity';
import {MoreThan, Repository} from 'typeorm';
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
    const movie = await this.MovieRepository.exist({
      where: { id: id },
    });
    if (!movie) throw new NotFoundException('존재하지 않는 영화입니다.');
    createReviewDto.movieId = id;
    return await this.ReviewRepository.save(createReviewDto);
  }

  async searchAll(id: number, score: string) {
    const movie = await this.MovieRepository.exist({
      where: { id: id },
    });
    const intScore = parseInt(score);
    if (!movie) throw new NotFoundException('존재하지 않는 영화입니다.');
    return await this.ReviewRepository.find({
      where: { movieId: id, score: MoreThan(intScore) },
      order: { createdAt: 'DESC' },
    });
  }
}
