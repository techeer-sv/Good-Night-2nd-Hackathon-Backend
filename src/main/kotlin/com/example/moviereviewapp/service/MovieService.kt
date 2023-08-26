package com.example.moviereviewapp.service

import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.repository.MovieRepository
import org.springframework.stereotype.Service

@Service
class MovieService(private val movieRepository: MovieRepository) {

    fun createMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun getMovieById(movieId: Long): Movie {
        return movieRepository.findById(movieId).orElseThrow {
            throw NoSuchElementException("Movie with ID $movieId not found")
        }
    }

    fun updateMovie(movieId: Long, updatedMovie: Movie): Movie {
        val existingMovie = movieRepository.findById(movieId).orElseThrow {
            throw NoSuchElementException("Movie with ID $movieId not found")
        }

        existingMovie.apply {
            title = updatedMovie.title
            genre = updatedMovie.genre
            releaseDate = updatedMovie.releaseDate
            endDate = updatedMovie.endDate
            isShowing = updatedMovie.isShowing
        }

        return movieRepository.save(existingMovie)
    }

    fun getAllMovies(): List<Movie> {
        return movieRepository.findAll()
    }

    fun softDeleteMovie(movieId: Long) {
        val movie = movieRepository.findById(movieId).orElseThrow {
            throw NoSuchElementException("Movie with ID $movieId not found")
        }
        movie.isDeleted = true
        movieRepository.save(movie)
    }

    fun hardDeleteMovie(movieId: Long) {
        movieRepository.deleteById(movieId)
    }
}