package com.example.moviereviewapp.repository

import com.example.moviereviewapp.domain.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {
    fun findAllByMovieId(movieId: Long): List<Review>
}