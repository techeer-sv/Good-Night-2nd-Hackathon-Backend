package com.example.moviereviewapp.dto

import com.example.moviereviewapp.domain.Review

data class ReviewDTO(
    val id: Long?,
    val movieId: Long,
    val rating: Double,
    val content: String,
) {
    fun toEntity(): Review {
        return Review(
            id = id,
            movieId = movieId,
            rating = rating,
            content = content
        )
    }
}