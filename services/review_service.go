package services

import (
	"backend/models"
	"backend/repository"
)

type ReviewService struct {
	Repo repository.ReviewRepository
}

func NewReviewService(repo repository.ReviewRepository) *ReviewService {
	return &ReviewService{Repo: repo}
}

func (s *ReviewService) CreateReview(review *models.Review) error {
	return s.Repo.CreateReview(review)
}

func (s *ReviewService) GetAllByMovieId(id int) ([]*models.Review, error) {
	return s.Repo.GetAllByMovieID(id)
}
