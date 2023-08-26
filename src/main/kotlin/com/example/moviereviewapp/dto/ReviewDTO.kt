package com.example.moviereviewapp.dto

import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.domain.Review
import java.time.LocalDateTime

data class ReviewDTO(
    val id: Long?,
    val rating: Double,
    val content: String,
    val createdDateTime: LocalDateTime,
    val movieId: Long
) {
    fun toEntity(movie: Movie): Review {
        return Review(
            id = id,
            rating = rating,
            content = content,
            createdDateTime = createdDateTime,
            movie = movie
        )
    }
}