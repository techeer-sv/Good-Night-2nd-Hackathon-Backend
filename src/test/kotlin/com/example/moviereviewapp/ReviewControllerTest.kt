package com.example.moviereviewapp

import com.example.moviereviewapp.domain.Review
import com.example.moviereviewapp.dto.ReviewDTO
import com.example.moviereviewapp.repository.ReviewRepository
import com.example.moviereviewapp.service.ReviewService
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

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension::class)
class ReviewControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Autowired
    private lateinit var reviewRepository: ReviewRepository

    @Autowired
    private lateinit var reviewService: ReviewService

    private fun createInitialReview(): Review {
        return reviewRepository.save(
            Review(
                movieId = 1L,
                rating = 3.5,
                content = "content"
            )
        )
    }

    @Test
    fun testCreateReview() {
        val reviewDTO = ReviewDTO(
            id = null,
            movieId = 1L,
            rating = 3.5,
            content = "content"
        )

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reviewDTO))
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)

        val savedReview = reviewRepository.findAllByMovieId(reviewDTO.movieId)[0]

        assertNotNull(savedReview)
        assertEquals(reviewDTO.movieId, savedReview.movieId)
        assertEquals(reviewDTO.rating, savedReview.rating)
        assertEquals(reviewDTO.content, savedReview.content)

        savedReview.id?.let { reviewService.hardDeleteReview(it) }
    }
}