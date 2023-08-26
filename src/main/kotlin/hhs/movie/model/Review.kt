package hhs.movie.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "reviews")
data class Review(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,

        // 어떤 영화에 대해서 평가
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "movie_id", nullable = false)
        val movie: Movie,

        // 평점 5점 만점
        @Column(nullable = false)
        var rating: Double,

        // 리뷰 내용
        @Column(length = 1000) // Adjust the length as needed
        var content: String,

        @Column(name = "created_date", nullable = false, updatable = false)
        val createdDate: LocalDateTime = LocalDateTime.now()
)