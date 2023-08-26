import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../movie/movie.entity';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository, // mock용 Repository 클래스 사용
        },
        {
          provide: getRepositoryToken(Review),
          useClass: Repository, // mock용 Repository 클래스 사용
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    module.get<Repository<Movie>>(getRepositoryToken(Movie));
    module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
