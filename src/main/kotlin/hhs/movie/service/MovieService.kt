package hhs.movie.service

import hhs.movie.model.Genre
import hhs.movie.model.Movie
import hhs.movie.repository.MovieRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class MovieService(private val movieRepository: MovieRepository) {

    fun createMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun updateMovie(movie: Movie): Movie {
        movie.updatedDate = LocalDateTime.now()
        return movieRepository.save(movie)
    }

    fun deleteMovie(movieId: Long) {
        val movie = movieRepository.findById(movieId).orElseThrow { Exception("Movie not found") }
        movie.isDeleted = true
        movieRepository.save(movie)
    }

    fun findMovieById(movieId: Long): Movie {
        return movieRepository.findById(movieId).orElseThrow { Exception("Movie not found") }
    }

    fun findAllMovies(): List<Movie> {
        return movieRepository.findByIsDeletedFalseOrderByReleaseDate()
    }

    fun findMoviesByGenre(genre: Genre): List<Movie> {
        return movieRepository.findByGenreAndIsDeletedFalse(genre)
    }

    fun findMoviesByShowingStatus(isShowing: Boolean): List<Movie> {
        return movieRepository.findByIsShowingAndIsDeletedFalse(isShowing)
    }

}
