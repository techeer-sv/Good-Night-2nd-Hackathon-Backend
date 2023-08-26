package com.example.moviereviewapp.domain

import com.example.moviereviewapp.dto.MovieDTO
import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
data class Movie(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    var title: String,
    @Enumerated(EnumType.STRING)
    var genre: Genre,
    var releaseDate: LocalDate,
    var endDate: LocalDate,
    var isShowing: Boolean,
    val registrationDate: LocalDate = LocalDate.now(),
    var isDeleted: Boolean = false,

    @Column(name = "updated_date")
    var updatedDate: LocalDateTime? = null
) {
    fun toDTO(): MovieDTO {
        return MovieDTO(
            id = id,
            title = title,
            genre = genre,
            releaseDate = releaseDate,
            endDate = endDate,
            isShowing = isShowing,
            registrationDate = registrationDate
        )
    }
}