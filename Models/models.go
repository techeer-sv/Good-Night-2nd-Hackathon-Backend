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
}

type Reviews struct {
	ID        uint      `json:"id"`
	Title     string    `json:"title"`
	Start     string    `json:"start"`
	End       string    `json:"end"`
	Live      bool      `json:"live"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`
}

func (b *Reviews) TableName() string {
	return "reviews"
}

func (b *Movies) TableName() string {
	return "movies"
}
