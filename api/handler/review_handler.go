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

var reviewService *services.ReviewService

func InitializeReviewHandler(repo repository.ReviewRepository) {
	reviewService = services.NewReviewService(repo)
}

func CreateReviewHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CreateReviewHandler called")

	if reviewService == nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	review := &models.Review{}

	if err := json.NewDecoder(r.Body).Decode(review); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := reviewService.CreateReview(review); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

func GetAllReviewByMovieIdHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetAllByMovieIdHandler called")

	vars := mux.Vars(r)
	movieIDStr, ok := vars["id"]
	if !ok {
		http.Error(w, "Movie ID is required", http.StatusBadRequest)
		return
	}

	movieId, err := strconv.Atoi(movieIDStr)
	if err != nil {
		http.Error(w, "Invalid Movie ID", http.StatusBadRequest)
		return
	}

	reviews, err := reviewService.GetAllByMovieId(movieId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}
