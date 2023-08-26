package movie

import "time"

type Request struct {
	Title      string    `form:"title" binding:"required"`
	Genre      string    `form:"genre" binding:"required"`
	ReleasedAt time.Time `form:"releasedAt" binding:"required"`
	EndAt      time.Time `form:"endAt" binding:"required"`
}

func (r Request) toEntity() Movie {
	return Movie{
		Title:      r.Title,
		Genre:      r.Genre,
		IsShowing:  r.ReleasedAt.Before(time.Now()) && r.EndAt.After(time.Now()),
		ReleasedAt: r.ReleasedAt,
		EndAt:      r.EndAt,
	}
}

type withRatingAvgResponse struct {
	ID         uint      `json:"id"`
	Title      string    `json:"title"`
	Genre      string    `json:"genre"`
	RatingAvg  float64   `json:"ratingAvg"`
	IsShowing  bool      `json:"isShowing"`
	ReleasedAt time.Time `json:"releasedAt"`
	EndAt      time.Time `json:"updatedAt"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}
