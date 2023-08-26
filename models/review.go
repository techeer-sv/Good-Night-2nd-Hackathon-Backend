package models

import "time"

type Review struct {
	ID        int       `json:"id"`
	MovieID   int       `json:"movie_id"`
	Rating    float32   `json:"rating"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
