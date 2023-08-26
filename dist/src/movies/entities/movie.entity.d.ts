import { Review } from "src/reviews/entities/reviews.entity";
export declare class Movie {
    id: number;
    title: string;
    genre: string;
    releaseDate: Date;
    endDate: Date;
    isShowing: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    reviews: Review[];
}
