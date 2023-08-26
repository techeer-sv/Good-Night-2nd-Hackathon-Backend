package com.example.moviereviewapp

import com.example.moviereviewapp.domain.Genre
import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.dto.MovieDTO
import com.example.moviereviewapp.repository.MovieRepository
import com.example.moviereviewapp.service.MovieService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.time.LocalDate

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension::class)
class MovieControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Autowired
    private lateinit var movieRepository: MovieRepository

    @Autowired
    private lateinit var movieService: MovieService

    private fun createInitialMovie(): Movie {
        return movieRepository.save(
            Movie(
                title = "Initial Movie",
                genre = Genre.ACTION,
                releaseDate = LocalDate.of(2023, 8, 1),
                endDate = LocalDate.of(2023, 8, 31),
                isShowing = true
            )
        )
    }

    @Test
    fun testCreateMovie() {
        val movieDTO = MovieDTO(
            id = null,
            title = "Test Movie",
            genre = Genre.ACTION,
            releaseDate = LocalDate.of(2023, 8, 1),
            endDate = LocalDate.of(2023, 8, 31),
            isShowing = true
        )

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/movies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(movieDTO))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        val savedMovie = movieRepository.findByTitle(movieDTO.title)

        assertNotNull(savedMovie)
        assertEquals(movieDTO.title, savedMovie?.title)
        assertEquals(movieDTO.genre, savedMovie?.genre)
        assertEquals(movieDTO.releaseDate, savedMovie?.releaseDate)
        assertEquals(movieDTO.endDate, savedMovie?.endDate)
        assertEquals(movieDTO.isShowing, savedMovie?.isShowing)

        savedMovie?.id?.let { movieService.hardDeleteMovie(it) }
    }

    @Test
    fun testUpdateMovie() {
        val savedInitialMovie = createInitialMovie()

        val updatedMovieDTO = MovieDTO(
            id = savedInitialMovie.id,
            title = "Updated Movie",
            genre = Genre.COMEDY,
            releaseDate = LocalDate.of(2023, 9, 1),
            endDate = LocalDate.of(2023, 9, 30),
            isShowing = false,
        )

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/movies/{id}", savedInitialMovie.id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedMovieDTO))
        )
            .andExpect(MockMvcResultMatchers.status().isOk)

        val updatedMovie = movieRepository.findById(savedInitialMovie.id!!).orElse(null)
        assertNotNull(updatedMovie)
        assertEquals(updatedMovieDTO.title, updatedMovie.title)
        assertEquals(updatedMovieDTO.genre, updatedMovie.genre)
        assertEquals(updatedMovieDTO.releaseDate, updatedMovie.releaseDate)
        assertEquals(updatedMovieDTO.endDate, updatedMovie.endDate)
        assertEquals(updatedMovieDTO.isShowing, updatedMovie.isShowing)

        assert(savedInitialMovie.updatedAt != updatedMovie.updatedAt) { "updatedAt should have changed" }

        savedInitialMovie.id?.let { movieService.hardDeleteMovie(it) }
    }
}