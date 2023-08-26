package com.example.moviereviewapp.service

import com.example.moviereviewapp.domain.Review
import com.example.moviereviewapp.dto.ReviewDTO
import com.example.moviereviewapp.repository.ReviewRepository
import org.springframework.stereotype.Service

@Service
class ReviewService(private val reviewRepository: ReviewRepository) {

    fun createReview(review: Review): Review {
        return reviewRepository.save(review)
    }

    fun getReviewsByMovie(movieId: Long, minRating: Double? = null): List<ReviewDTO> {
        val reviews = if (minRating != null) {
            reviewRepository.findAllByMovieIdAndRatingGreaterThanEqualOrderByCreatedAtDesc(movieId, minRating)
        } else {
            reviewRepository.findAllByMovieIdOrderByCreatedAtDesc(movieId)
        }

        return reviews.map { it.toDTO() }
    }

    fun hardDeleteReview(reviewId: Long) {
        reviewRepository.deleteById(reviewId)
    }
}