package hhs.movie.model

import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name="movies")
data class Movie(
        // id
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        //영화 이름
        @Column(nullable = false)
        var title: String,
        // 장르 / 스릴러, 로맨스, 코믹, 액션 4 중 1
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        var genre: Genre,

        // 개봉일자
        @Column(name = "release_date", nullable = false)
        var releaseDate: LocalDate,

        // 종료일자
        @Column(name = "end_date", nullable = false)
        var endDate: LocalDate,

        // 상영 여부
        @Column(name = "is_showing", nullable = true)
        var isShowing: Boolean,

        // 생성일자
        @Column(name = "created_date", nullable = false)
        var createdDate: LocalDateTime = LocalDateTime.now(),
        // 수정일자
        @Column(name = "updated_date")
        var updatedDate: LocalDateTime? = null,
        // 삭제여부
        @Column(name = "is_deleted", nullable = false)
        var isDeleted: Boolean = false
)
