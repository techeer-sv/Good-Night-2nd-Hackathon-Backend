/*
* Repo에서 조회한 데이터를 기반으로, 실제로 사용할 함수를 정의
* */
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
