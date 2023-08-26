package Models

import "time"

type Movies struct {
	ID        uint       `json:"id"`
	Title     string     `json:"title"`
	Start     CustomDate `json:"start"`
	End       CustomDate `json:"end"`
	Live      bool       `json:"live"`
	UpdatedAt time.Time  `json:"updated_at"`
	CreatedAt time.Time  `json:"created_at"`
}

type Reviews struct {
	ID        uint       `json:"id"`
	Title     string     `json:"title"`
	Start     CustomDate `json:"start"`
	End       CustomDate `json:"end"`
	Live      bool       `json:"live"`
	UpdatedAt time.Time  `json:"updated_at"`
	CreatedAt time.Time  `json:"created_at"`
}

type CustomDate struct {
	Year  int `json:"year"`
	Month int `json:"month"`
	Day   int `json:"day"`
}

func (b *Reviews) TableName() string {
	return "reviews"
}

func (b *Movies) TableName() string {
	return "movies"
}
