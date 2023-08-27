package repository

import "backend/models"

type MovieRepository interface {
	Create(movie *models.Movie) error
	Delete(id int) error
	Update(movie *models.Movie) error
	GetByID(id int) (*models.Movie, error)
	GetAll() ([]*models.Movie, error)
}

var _ MovieRepository = &InMemoryMovieRepository{}
