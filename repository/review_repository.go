package repository

import "backend/models"

type ReviewRepository interface {
	Create(review *models.Review)
	GetAllByMovieID(movieID int) ([]*models.Review, error)
}
