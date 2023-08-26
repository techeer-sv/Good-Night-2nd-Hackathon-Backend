package com.example.moviereviewapp.domain

import com.example.moviereviewapp.dto.ReviewDTO
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.sql.Timestamp
import java.time.Instant

@Entity
data class Review(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val movieId: Long,
    var rating: Double,
    var content: String,

    @CreationTimestamp
    val createdAt: Timestamp? = null,
    var updatedAt: Timestamp? = null,
    var deleted: Boolean = false,
) {
    init {
        if (rating > 5.0) {
            rating = 5.0
        }
    }

    @PreUpdate
    private fun onUpdate() {
        updatedAt = Timestamp.from(Instant.now())
    }

    fun toDTO(): ReviewDTO {
        return ReviewDTO(
            id = id,
            movieId = movieId,
            rating = rating,
            content = content
        )
    }
}