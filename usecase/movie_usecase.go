package usecase

import (
	"errors"
	"server/domain"
)

type MovieUsecase interface {
	AddMovie(movie *domain.Movie) error
	ListMovies(options *domain.RatingQueryOptions) ([]domain.Movie, error)
	GetMovieById(id int) (domain.Movie, error)
	ListMoviesByRating(options *domain.PaginationOptions) ([]domain.MovieWithRating, error)
	UpdateMovieDetails(movie *domain.Movie) error
	RemoveMovie(movie *domain.Movie) error
}

type movieUsecase struct {
	movieRepo domain.MovieRepository
}

func NewMovieUsecase(movieRepo domain.MovieRepository) MovieUsecase {
	return &movieUsecase{movieRepo}
}

func (u *movieUsecase) AddMovie(movie *domain.Movie) error {
	if movie.Title == "" || movie.Genre == "" {
		return errors.New("Movie title or genre cannot be empty")
	}
	return u.movieRepo.Insert(movie)
}

func (u *movieUsecase) ListMovies(options *domain.RatingQueryOptions) ([]domain.Movie, error) {
	return u.movieRepo.FindAll(options)
}

func (u *movieUsecase) GetMovieById(id int) (domain.Movie, error) {
	movie, err := u.movieRepo.FindById(id)
	if err != nil {
		return domain.Movie{}, err
	}
	return movie, nil
}

func (u *movieUsecase) ListMoviesByRating(options *domain.PaginationOptions) ([]domain.MovieWithRating, error) {
	return u.movieRepo.FindAllByRating(options)
}

func (u *movieUsecase) UpdateMovieDetails(movie *domain.Movie) error {
	if movie.Title == "" || movie.Genre == "" {
		return errors.New("Movie title or genre cannot be empty")
	}
	return u.movieRepo.Update(movie)
}

func (u *movieUsecase) RemoveMovie(movie *domain.Movie) error {
	return u.movieRepo.Delete(movie)
}
