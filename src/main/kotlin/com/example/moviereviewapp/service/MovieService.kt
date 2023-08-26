package com.example.moviereviewapp.service

import com.example.moviereviewapp.domain.Genre
import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.dto.MovieDTO
import com.example.moviereviewapp.repository.MovieRepository
import jakarta.persistence.criteria.Predicate
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service

@Service
class MovieService(private val movieRepository: MovieRepository) {

    fun createMovie(movie: Movie): Movie {
        return movieRepository.save(movie)
    }

    fun getMovieById(movieId: Long): Movie {
        return movieRepository.findByIdAndDeletedIsFalse(movieId).orElseThrow {
            throw NoSuchElementException("Movie with ID $movieId not found")
        }
    }

    fun getMovies(
        genre: Genre?,
        isShowing: Boolean?,
        pageable: Pageable
    ): Page<MovieDTO> {
        val specification = Specification.where<Movie> { root, _, criteriaBuilder ->
            val predicates: MutableList<Predicate> = mutableListOf()

            genre?.let { predicates.add(criteriaBuilder.equal(root.get<Genre>("genre"), genre)) }
            isShowing?.let { predicates.add(criteriaBuilder.equal(root.get<Boolean>("isShowing"), isShowing)) }

            predicates.add(criteriaBuilder.equal(root.get<Boolean>("deleted"), false))

            criteriaBuilder.and(*predicates.toTypedArray())
        }

        val moviesPage: Page<Movie> = movieRepository.findAll(specification, pageable)
        return moviesPage.map { movie -> movie.toDTO() }
    }

    fun updateMovie(movieId: Long, updatedMovie: Movie): Movie {
        val existingMovie = movieRepository.findByIdAndDeletedIsFalse(movieId).orElseThrow {
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

    fun softDeleteMovie(movieId: Long) {
        val movie = movieRepository.findByIdAndDeletedIsFalse(movieId).orElseThrow {
            throw NoSuchElementException("Movie with ID $movieId not found")
        }
        movie.deleted = true
        movieRepository.save(movie)
    }

    fun hardDeleteMovie(movieId: Long) {
        movieRepository.deleteById(movieId)
    }
}