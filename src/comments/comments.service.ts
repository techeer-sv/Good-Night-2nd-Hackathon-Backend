import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const movie = await this.movieRepository.exist({
      where: { id: createCommentDto.movieId },
    });

    if (!movie) {
      throw new NotFoundException('영화 없어');
    }

    return await this.commentRepository.save(createCommentDto);
  }

  findAll(movieId: number) {
    return this.commentRepository.find({
      where: { movieId: movieId },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.softDelete(id);
  }
}
