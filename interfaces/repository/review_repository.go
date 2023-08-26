package repository

import (
	"database/sql"
	"server/domain"
)

type reviewRepository struct {
	Db *sql.DB
}

func NewReviewRepository(Db *sql.DB) domain.ReviewRepository {
	return &reviewRepository{Db}
}

func (r *reviewRepository) Insert(review *domain.Review) error {
	query := "INSERT INTO reviews (movie_id, rating, content) VALUES ($1, $2, $3) RETURNING id"
	_, err := r.Db.Exec(query, review.MovieID, review.Rating, review.Content)
	return err
}
