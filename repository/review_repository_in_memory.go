package repository

import (
	"backend/models"
	"errors"
	"sync"
)

type InMemoryReviewRepository struct {
	reviews []*models.Review
	mu      sync.RWMutex
	nextID  int
}

func NewInMemoryReviewRepository() *InMemoryReviewRepository {
	return &InMemoryReviewRepository{
		reviews: make([]*models.Review, 0),
		nextID:  1,
	}
}

func (repo *InMemoryReviewRepository) CreateReview(review *models.Review) error {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	review.ID = repo.nextID
	repo.reviews = append(repo.reviews, review)
	repo.nextID++
	return nil
}

func (repo *InMemoryReviewRepository) GetAllByMovieID(movieID int) ([]*models.Review, error) {
	repo.mu.RLock()
	defer repo.mu.RUnlock()

	var movieReviews []*models.Review
	for _, review := range repo.reviews {
		if review.MovieID == movieID {
			movieReviews = append(movieReviews, review)
		}
	}
	if len(movieReviews) == 0 {
		return nil, errors.New("no review found for the movie")
	}
	return movieReviews, nil
}
