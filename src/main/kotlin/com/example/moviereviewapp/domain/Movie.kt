package com.example.moviereviewapp.domain

import com.example.moviereviewapp.dto.MovieDTO
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.sql.Timestamp
import java.time.Instant
import java.time.LocalDate


@Entity
data class Movie(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, length = 64, unique = true)
    var title: String,
    @Enumerated(EnumType.STRING)
    var genre: Genre,
    var releaseDate: LocalDate,
    var endDate: LocalDate,
    var isShowing: Boolean,

    @CreationTimestamp
    val createdAt: Timestamp? = null,
    var updatedAt: Timestamp? = null,
    var deleted: Boolean = false,
) {
    @PreUpdate
    private fun onUpdate() {
        updatedAt = Timestamp.from(Instant.now())
    }

    fun toDTO(): MovieDTO {
        return MovieDTO(
            id = id,
            title = title,
            genre = genre,
            releaseDate = releaseDate,
            endDate = endDate,
            isShowing = isShowing
        )
    }
}