package models

import "time"

type Review struct {
	ID        int
	MovieID   int
	Rating    float64
	Content   string
	CreatedAt time.Time
}
