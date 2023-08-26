import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
@Entity()
export class Movie {
  // 영화 고유 번호
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  // 제목
  @Column()
  title: string;

  // 장르
  @Column()
  genre: string;

  // 개봉일
  @Column('datetime')
  releaseDate: Date;

  // 상영 종료일
  @Column('datetime')
  endDate: Date;

  // 상영 중 여부
  @Column()
  isShowing: boolean;

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
