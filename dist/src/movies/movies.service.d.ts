import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
export declare class MoviesService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    deleteMovie(id: number): Promise<Movie>;
}
