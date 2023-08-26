package domain

import (
	"database/sql"
	"time"
)

type Movie struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Genre       string       `json:"genre"`
	ReleaseDate *time.Time   `json:"release_date"`
	EndDate     *time.Time   `json:"end_date"`
	IsShowing   bool         `json:"is_showing"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
	DeletedAt   sql.NullTime `json:"deleted_at"`
}

type MovieRepository interface {
	Insert(movie *Movie) error
	FindAll(options *RatingQueryOptions) ([]Movie, error)
	FindById(id int) (Movie, error)
	FindAllByRating(options *PaginationOptions) ([]MovieWithRating, error)
	Update(movie *Movie) error
	Delete(movie *Movie) error
}

type MovieWithRating struct {
	Movie     Movie
	AvgRating float64
}

type PaginationOptions struct {
	Page     int
	PageSize int
}

type RatingQueryOptions struct {
	Genre     string
	IsShowing *bool
}
