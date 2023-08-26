package Models

import (
	"time"
)

type Movies struct {
	ID        uint      `json:"id"`
	Title     string    `json:"title"`
	Genre     string    `json:"genre"`
	Start     string    `json:"start"`
	End       string    `json:"end"`
	Active    bool      `json:"active"`
	IsDelete  bool      `json:"is_delete"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`
	AvgRating float64   `json:"avg_rating"`
	Reviews   []Reviews `json:"reviews" gorm:"foreignkey:MovieID"`
}

type Reviews struct {
	ID          uint      `json:"id"`
	MovieID     int       `json:"movie_id"`
	Description string    `json:"description"`
	Rating      float64   `json:"rating"`
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}

func (b *Reviews) TableName() string {
	return "reviews"
}

func (b *Movies) TableName() string {
	return "movies"
}
