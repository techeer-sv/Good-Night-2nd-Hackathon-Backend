package domain

import (
	"database/sql"
	"time"
)

type Review struct {
	ID        int          `json:"id"`
	MovieID   int          `json:"movie_id"`
	Rating    int          `json:"rating"`
	Content   string       `json:"content"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at,omitempty"`
}

type ReviewRepository interface {
	Insert(review *Review) error
	FindAllByMovie(options *ReviewQueryOptions) ([]Review, error)
}

type ReviewQueryOptions struct {
	MovieId int
	Rating  float64
}
