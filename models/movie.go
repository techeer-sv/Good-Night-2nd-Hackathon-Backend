package models

import "time"

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
