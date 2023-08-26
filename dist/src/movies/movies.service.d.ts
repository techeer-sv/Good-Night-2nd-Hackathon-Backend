import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
export declare class MoviesService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    getOneMovie(id: number): Promise<Movie>;
    getFilteredAndSortedMovies(genre: string, isShowing: boolean): Promise<Movie[]>;
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie | undefined>;
    deleteMovie(id: number): Promise<Movie>;
}
