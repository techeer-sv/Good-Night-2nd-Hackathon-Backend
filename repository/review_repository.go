package repository

import "backend/models"

type ReviewRepository interface {
	CreateReview(review *models.Review) error
	GetAllByMovieID(movieID int) ([]*models.Review, error)
}

var _ ReviewRepository = &InMemoryReviewRepository{}
