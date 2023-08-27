package repository

import (
	"database/sql"
	"errors"
	"server/domain"
	"strconv"
	"time"
)

type movieRepository struct {
	Db *sql.DB
}

func NewMovieRepository(Db *sql.DB) domain.MovieRepository {
	return &movieRepository{Db}
}

func (r *movieRepository) Insert(movie *domain.Movie) error {
	query := "INSERT INTO movies (title, genre, release_date, end_date, is_showing) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	_, err := r.Db.Exec(query, movie.Title, movie.Genre, movie.ReleaseDate, movie.EndDate, movie.IsShowing)
	return err
}

func (r *movieRepository) FindAll(options *domain.RatingQueryOptions) ([]domain.Movie, error) {
	query := "SELECT * FROM movies WHERE deleted_at IS NULL"
	var args []interface{}
	var argCounter int = 1

	if options.Genre != "" {
		query += " AND genre = $" + strconv.Itoa(argCounter)
		args = append(args, options.Genre)
		argCounter++
	}

	if options.IsShowing != nil {
		query += " AND is_showing = $" + strconv.Itoa(argCounter)
		args = append(args, *options.IsShowing)
		argCounter++
	}

	query += " ORDER BY release_date ASC"

	rows, err := r.Db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []domain.Movie
	for rows.Next() {
		var movie domain.Movie
		if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genre, &movie.ReleaseDate, &movie.EndDate, &movie.IsShowing, &movie.CreatedAt, &movie.UpdatedAt, &movie.DeletedAt); err != nil {
			return nil, err
		}
		movies = append(movies, movie)
	}

	return movies, nil
}

func (r *movieRepository) FindById(id int) (domain.Movie, error) {
	query := "SELECT * FROM movies WHERE id = $1 AND deleted_at IS NULL"
	row := r.Db.QueryRow(query, id)

	var movie domain.Movie
	if err := row.Scan(&movie.ID, &movie.Title, &movie.Genre, &movie.ReleaseDate, &movie.EndDate, &movie.IsShowing, &movie.CreatedAt, &movie.UpdatedAt, &movie.DeletedAt); err != nil {
		if err == sql.ErrNoRows {
			return domain.Movie{}, errors.New("Movie not found")
		}
		return domain.Movie{}, err
	}

	return movie, nil
}

func (r *movieRepository) FindAllByRating(options *domain.PaginationOptions) ([]domain.MovieWithRating, error) {
	// SQL 쿼리에서 페이지네이션을 적용하기 위한 계산
	offset := (options.Page - 1) * options.PageSize
	limit := options.PageSize

	// 평점과 함께 영화 정보를 조회하는 쿼리
	query := `
		SELECT m.id, m.title, m.genre, m.release_date, m.end_date, m.is_showing, m.created_at, m.updated_at, m.deleted_at, COALESCE(AVG(r.rating), 0) as avg_rating
		FROM movies m
				 LEFT JOIN reviews r ON m.id = r.movie_id
		GROUP BY m.id, m.title, m.genre, m.release_date, m.end_date, m.is_showing, m.created_at, m.updated_at, m.deleted_at
		ORDER BY avg_rating DESC
		LIMIT $1 OFFSET $2`

	rows, err := r.Db.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var moviesWithRating []domain.MovieWithRating
	for rows.Next() {
		var movieWithRating domain.MovieWithRating
		var movie domain.Movie

		if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genre, &movie.ReleaseDate, &movie.EndDate, &movie.IsShowing, &movie.CreatedAt, &movie.UpdatedAt, &movie.DeletedAt, &movieWithRating.AvgRating); err != nil {
			return nil, err
		}
		movieWithRating.Movie = movie
		moviesWithRating = append(moviesWithRating, movieWithRating)
	}

	return moviesWithRating, nil
}

func (r *movieRepository) Update(movie *domain.Movie) error {
	query := "UPDATE movies SET title = $1, genre = $2, release_date = $3, end_date = $4, is_showing = $5 WHERE id = $6"
	_, err := r.Db.Exec(query, movie.Title, movie.Genre, movie.ReleaseDate, movie.EndDate, movie.IsShowing, movie.ID)
	return err

}

func (r *movieRepository) Delete(movie *domain.Movie) error {
	query := "UPDATE movies SET deleted_at = $1 WHERE id = $2"
	_, err := r.Db.Exec(query, time.Now(), movie.ID)
	return err
}
