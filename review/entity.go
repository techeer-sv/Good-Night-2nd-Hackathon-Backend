package review

import (
	"gorm.io/gorm"
	"time"
)

type Review struct {
	gorm.Model
	ID        uint
	MovieID   uint `gorm:"foreignKey:MovieID"`
	Content   string
	Rating    float64
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
