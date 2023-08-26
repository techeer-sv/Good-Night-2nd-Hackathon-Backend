// eslint-disable-next-line prettier/prettier
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column()
  releaseDate: string;

  @Column()
  endDate: string;

  @Column()
  releaseStatus: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  @Exclude() // 변환시 제외
  @DeleteDateColumn({ type: 'boolean' })
  deletedAt?: true | false;
}
