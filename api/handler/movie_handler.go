package handler

import (
	"backend/models"
	"backend/repository"
	"backend/services"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

var movieService *services.MovieService

func InitializeHandler(repo repository.MovieRepository) {
	movieService = services.NewMovieService(repo)
}

func CreateMovieHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CreateMovieHandler called")

	if movieService == nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	movie := &models.Movie{}

	if err := json.NewDecoder(r.Body).Decode(movie); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := movieService.CreateMovie(movie); err != nil {
		fmt.Println("Error creating movie:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movie)
}

func GetMovieByIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	movie, err := movieService.GetByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movie)
}

func GetAllMoviesHandler(w http.ResponseWriter, r *http.Request) {
	movies, err := movieService.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
}

func UpdateMovieHandler(w http.ResponseWriter, r *http.Request) {
	movie := &models.Movie{}
	if err := json.NewDecoder(r.Body).Decode(movie); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := movieService.UpdateMovie(movie); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movie)
}

func DeleteMovieHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	if err := movieService.DeleteMovie(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Movie deleted successfully"))
}
