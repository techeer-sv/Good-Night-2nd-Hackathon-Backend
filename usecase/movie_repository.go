package usecase

import "server/domain"

type QueryOptions struct {
	Genre     string
	IsShowing *bool
}

type MovieRepository interface {
	Insert(movie *domain.Movie) error
	FindAll(options *QueryOptions) ([]domain.Movie, error)
	FindById(id int) (domain.Movie, error)
	Update(movie *domain.Movie) error
	Delete(movie *domain.Movie) error
}
