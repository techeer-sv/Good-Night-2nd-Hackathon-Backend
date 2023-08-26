package models

import "time"

// Movie represents a movie
// swagger:model
type Movie struct {
	ID           int
	Title        string
	Genre        string
	ReleaseDate  time.Time
	EndDate      time.Time
	IsNowShowing bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
	IsDeleted    bool
}

// Review represents a review
// swagger:model
type Review struct {
	ID        int
	MovieID   int
	Rating    float64
	Content   string
	CreatedAt time.Time
}
