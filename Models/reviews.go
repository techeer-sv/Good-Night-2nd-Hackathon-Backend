package Models

import (
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	_ "gorm.io/driver/sqlite"
)

func GetReviewsByID(review *[]Reviews, id string) (err error) {
	if err := Config.DB.Where("movie_id = ?", id).Order("updated_at DESC").Find(review).Error; err != nil {
		return err
	}
	return nil
}

func GetReviewsByStars(review *[]Reviews, stars string) (err error) {
	if err := Config.DB.Where("rating > ?", stars).Order("updated_at DESC").Find(review).Error; err != nil {
		return err
	}
	return nil
}

func CreateReview(review *Reviews) (err error) {
	if err := Config.DB.Create(review).Error; err != nil {
		return err
	}
	return nil
}
