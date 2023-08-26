import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../movie/movie.entity';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ReviewService>(ReviewService);
    module.get<Repository<Movie>>(getRepositoryToken(Movie));
    module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
