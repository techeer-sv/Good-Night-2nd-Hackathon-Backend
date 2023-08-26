package movie

import "time"

type createRequest struct {
	Title      string    `form:"title" binding:"required"`
	Genre      string    `form:"genre" binding:"required"`
	ReleasedAt time.Time `form:"releasedAt" binding:"required"`
	EndAt      time.Time `form:"endAt" binding:"required"`
}

func (r createRequest) toEntity() Movie {
	return Movie{
		Title:      r.Title,
		Genre:      r.Genre,
		IsShowing:  r.ReleasedAt.Before(time.Now()) && r.EndAt.After(time.Now()),
		ReleasedAt: r.ReleasedAt,
		EndAt:      r.EndAt,
	}
}
