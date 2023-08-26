package hhs.movie.model

import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name="movies")
data class Movie(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,

        @Column(nullable = false)
        var title: String,

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        var genre: Genre,

        @Column(name = "release_date", nullable = false)
        var releaseDate: LocalDate,

        @Column(name = "end_date", nullable = false)
        var endDate: LocalDate,

        @Column(name = "is_showing", nullable = false)
        var isShowing: Boolean,

        @Column(name = "created_date", nullable = false)
        var createdDate: LocalDateTime = LocalDateTime.now(),

        @Column(name = "updated_date")
        var updatedDate: LocalDateTime? = null,

        @Column(name = "is_deleted", nullable = false)
        var isDeleted: Boolean = false
)
