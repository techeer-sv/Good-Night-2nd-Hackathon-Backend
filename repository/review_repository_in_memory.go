package repository

import (
	"backend/models"
	"errors"
)

type InMemoryReviewRepository struct {
	reviews []*models.Review
	nextID  int
}

func NewInMemoryReviewRepository() *InMemoryReviewRepository {
	return &InMemoryReviewRepository{
		reviews: make([]*models.Review, 0),
		nextID:  1,
	}
}

func (r *InMemoryReviewRepository) Create(review *models.Review) {
	review.ID = r.nextID
	r.reviews = append(r.reviews, review)
	r.nextID++
}

func (r *InMemoryReviewRepository) GetAllByMovieID(movieID int) ([]*models.Review, error) {
	var movieReviews []*models.Review
	for _, review := range r.reviews {
		if review.MovieID == movieID {
			movieReviews = append(movieReviews, review)
		}
	}
	if len(movieReviews) == 0 {
		return nil, errors.New("no review found for the movie")
	}
	return movieReviews, nil
}
