package movie

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	ID         uint
	Title      string `gorm:"uniqueKey"`
	Genre      string
	ReleasedAt time.Time
	EndAt      time.Time
	CreatedAt  time.Time `gorm:"autoCreateTime"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime"`
	IsShowing  bool
}
