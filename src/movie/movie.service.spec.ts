import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movie.entity'; // Import your entity class

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository, // mock용 Repository 클래스 사용
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
