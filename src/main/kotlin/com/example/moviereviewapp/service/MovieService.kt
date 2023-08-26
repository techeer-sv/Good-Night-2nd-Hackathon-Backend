package com.example.moviereviewapp.service

import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.repository.MovieRepository
import org.springframework.stereotype.Service

@Service
class MovieService(private val movieRepository: MovieRepository) {

    fun createMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun updateMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun getAllMovies(): List<Movie> {
        return movieRepository.findAll()
    }

    fun getMovieById(id: Long): Movie? {
        return movieRepository.findById(id).orElse(null)
    }
}