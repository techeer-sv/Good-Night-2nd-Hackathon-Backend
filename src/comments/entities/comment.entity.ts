import { Exclude } from 'class-transformer';
import { Movie } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  // 댓글 고유 번호
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;

  @Column()
  movieId: number;

  // 댓글 내용
  @Column({
    type: 'text',
  })
  content: string;

  // 댓글 평점
  @Column({
    type: 'float',
  })
  rating: number;

  // 등록 일자
  @CreateDateColumn({
    type: 'timestamp' /* timestamp with time zone */,
  })
  createdAt: Date;

  // 수정 일자
  @UpdateDateColumn({
    type: 'timestamp' /* timestamp with time zone */,
  })
  updatedAt: Date;

  // 삭제 일자
  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
