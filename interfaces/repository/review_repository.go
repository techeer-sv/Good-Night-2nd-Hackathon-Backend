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

func (r *reviewRepository) FindAllByMovie(options *domain.ReviewQueryOptions) ([]domain.Review, error) {
	query := "SELECT * FROM reviews WHERE movie_id = $1"
	args := []interface{}{options.MovieId}

	if options.Rating > 0 {
		query += " AND rating >= $2"
		args = append(args, options.Rating)
	}

	query += " ORDER BY created_at DESC"

	rows, err := r.Db.Query(query, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var reviews []domain.Review
	for rows.Next() {
		var review domain.Review
		if err := rows.Scan(&review.ID, &review.MovieID, &review.Rating, &review.Content, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt); err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}
	return reviews, nil
}
