package hhs.movie.service

import hhs.movie.model.Review
import hhs.movie.repository.ReviewRepository
import org.springframework.stereotype.Service

@Service
class ReviewService(private val reviewRepository: ReviewRepository) {

    fun createReview(review: Review): Review {
        return reviewRepository.save(review)
    }

    fun findReviewsByMovieId(movieId: Long): List<Review> {
        return reviewRepository.findByMovieIdOrderByCreatedDateDesc(movieId)
    }

    fun findReviewsByMovieIdWithRatingThreshold(movieId: Long, rating: Double): List<Review> {
        return reviewRepository.findByMovieIdAndRatingGreaterThanEqualOrderByCreatedDateDesc(movieId, rating)
    }

}
