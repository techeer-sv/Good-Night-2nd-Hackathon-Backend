package com.example.moviereviewapp.service

import com.example.moviereviewapp.domain.Review
import com.example.moviereviewapp.repository.ReviewRepository
import org.springframework.stereotype.Service

@Service
class ReviewService(private val reviewRepository: ReviewRepository) {

    fun createReview(review: Review): Review {
        return reviewRepository.save(review)
    }

    fun getReviewsByMovie(movieId: Long): List<Review> {
        return reviewRepository.findAllByMovieId(movieId)
    }
}