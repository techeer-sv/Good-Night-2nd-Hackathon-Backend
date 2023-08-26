import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { Review } from "src/reviews/entities/reviews.entity";
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getOneMovie(id: string): Promise<Movie>;
    getTermMovie(genre: string, isShowing: boolean): Promise<Movie[]>;
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    updateMovie(movieData: Partial<Movie>, id: string): Promise<Movie>;
    deleteMovie(id: string): Promise<Movie>;
    createReview(movieId: string, rating: number, content: string): Promise<Review>;
    getMovieReviews(id: number, minRating: number): Promise<Review[]>;
}
