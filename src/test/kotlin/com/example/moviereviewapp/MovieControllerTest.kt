package com.example.moviereviewapp

import com.example.moviereviewapp.domain.Genre
import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.dto.MovieDTO
import com.example.moviereviewapp.repository.MovieRepository
import com.example.moviereviewapp.service.MovieService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Assertions.*
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
    fun testGetMovieById() {
        val savedInitialMovie = createInitialMovie()

        mockMvc.perform(MockMvcRequestBuilders.get("/api/movies/${savedInitialMovie.id}"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(savedInitialMovie.id))
            .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(savedInitialMovie.title))
            .andExpect(MockMvcResultMatchers.jsonPath("$.genre").value(savedInitialMovie.genre.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.releaseDate").value(savedInitialMovie.releaseDate.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.endDate").value(savedInitialMovie.endDate.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.isShowing").value(savedInitialMovie.isShowing))

        savedInitialMovie.id?.let { movieService.hardDeleteMovie(it) }
    }

    @Test
    fun testGetMovies() {
        val movies = listOf(
            Movie(null, "Movie 1", Genre.ROMANCE, LocalDate.of(2023, 8, 1), LocalDate.of(2023, 8, 31), true),
            Movie(null, "Movie 2", Genre.THRILLER, LocalDate.of(2023, 8, 1), LocalDate.of(2023, 8, 31), false),
            Movie(null, "Movie 3", Genre.ROMANCE, LocalDate.of(2023, 8, 1), LocalDate.of(2023, 8, 31), false),
            Movie(null, "Movie 4", Genre.ROMANCE, LocalDate.of(2023, 8, 1), LocalDate.of(2023, 8, 31), false),
            Movie(null, "Movie 5", Genre.ROMANCE, LocalDate.of(2025, 8, 1), LocalDate.of(2023, 8, 31), false),
            Movie(null, "Movie 6", Genre.ROMANCE, LocalDate.of(2023, 8, 1), LocalDate.of(2023, 8, 31), false),
            Movie(null, "Movie 7", Genre.ROMANCE, LocalDate.of(2024, 8, 1), LocalDate.of(2023, 8, 31), false)
        )
        val savedMovies = movieRepository.saveAll(movies)

        val pageSize = 2

        try {
            mockMvc.perform(
                MockMvcRequestBuilders.get("/api/movies")
                    .param("page", "0")
                    .param("size", pageSize.toString())
                    .param("genre", "ROMANCE")
                    .param("isShowing", "false")
                    .contentType(MediaType.APPLICATION_JSON)
            )
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray)
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(pageSize))
                .andExpect(MockMvcResultMatchers.jsonPath("$.totalPages").value(3))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].movie.title").value("Movie 5"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[1].movie.title").value("Movie 7"))
        } finally {
            movieRepository.deleteAll(savedMovies)
        }
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

    @Test
    fun testSoftDeleteMovie() {
        val savedInitialMovie = createInitialMovie()

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/movies/${savedInitialMovie.id}"))
            .andExpect(MockMvcResultMatchers.status().isNoContent)

        val deletedMovie = movieRepository.findById(savedInitialMovie.id!!).get()
        assertTrue(deletedMovie.deleted)

        savedInitialMovie.id?.let { movieService.hardDeleteMovie(it) }
    }
}