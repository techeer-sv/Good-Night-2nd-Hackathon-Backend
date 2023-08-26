package models

import "time"

type Movie struct {
	ID          int        `json:"id"`
	Title       string     `json:"title"`
	Genre       string     `json:"genre"`
	ReleaseDate time.Time  `json:"release_date"`
	EndDate     time.Time  `json:"end_date"`
	IsShowing   bool       `json:"is_showing"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}
