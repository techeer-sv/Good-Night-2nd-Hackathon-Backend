package main

import (
	"backend/api/handler"
	"backend/repository"
	"github.com/gorilla/mux"
	"net/http"
)

func main() {
	// MovieRepository의 실제 구현체를 초기화한다. (예: MySQL을 사용하는 경우)
	repo := repository.NewInMemoryMovieRepository()

	// 핸들러를 초기화한다.
	handler.InitializeHandler(repo)

	// Method 처리를 위해 라우터를 설정한다
	r := mux.NewRouter()

	// movies 핸들러를 서버에 바인딩한다.
	r.HandleFunc("/movies", handler.CreateMovieHandler).Methods("POST")
	r.HandleFunc("/movies/{id:[0-9]+}", handler.GetMovieByIDHandler).Methods("GET")
	r.HandleFunc("/movies", handler.GetAllMoviesHandler).Methods("GET")
	r.HandleFunc("/movies", handler.UpdateMovieHandler).Methods("PUT")
	r.HandleFunc("/movies/{id:[0-9]+}", handler.DeleteMovieHandler).Methods("DELETE")

	// review 핸들러를 서버에 바인딩한다.

	// 기본값 핸들링
	http.Handle("/", r)

	// 서버 시작
	http.ListenAndServe(":8080", nil)
}
