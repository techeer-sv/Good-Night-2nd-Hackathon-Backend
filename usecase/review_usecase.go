package usecase

import (
	"errors"
	"server/domain"
)

type ReviewUsecase interface {
	AddReview(review *domain.Review) error
	ListReviewsByMovie(options *domain.ReviewQueryOptions) ([]domain.Review, error)
}

type reviewUsecase struct {
	reviewRepo domain.ReviewRepository
}

func NewReviewUsecase(reviewRepo domain.ReviewRepository) ReviewUsecase {
	return &reviewUsecase{reviewRepo}
}

func (u *reviewUsecase) AddReview(review *domain.Review) error {
	if review.Content == "" {
		return errors.New("Review content cannot be empty")
	}
	return u.reviewRepo.Insert(review)
}

func (u *reviewUsecase) ListReviewsByMovie(options *domain.ReviewQueryOptions) ([]domain.Review, error) {
	return u.reviewRepo.FindAllByMovie(options)
}
