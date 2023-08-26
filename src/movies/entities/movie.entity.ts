import { IsInt, IsString, Length } from "class-validator";
import { relative } from "path";
import { Review } from "src/reviews/entities/reviews.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Movie {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(10, 200)
  @Column({ nullable: false })
  title: string;

  @IsString()
  @Column({ type: "enum", enum: ["스릴러", "로맨스", "코믹", "액션"] })
  genre: string;

  @Column({ type: "date" })
  releaseDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ default: true })
  isShowing: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
