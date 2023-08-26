package com.example.moviereviewapp.domain

import com.example.moviereviewapp.dto.ReviewDTO
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Review(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val rating: Double,
    val content: String,
    val createdDateTime: LocalDateTime = LocalDateTime.now(),

    @ManyToOne
    val movie: Movie
) {
    fun toDTO(): ReviewDTO {
        return ReviewDTO(
            id = id,
            rating = rating,
            content = content,
            createdDateTime = createdDateTime,
            movieId = movie.id ?: throw IllegalStateException("Movie ID cannot be null")
        )
    }
}