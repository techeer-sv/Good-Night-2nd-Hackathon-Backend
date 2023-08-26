package database

import "database/sql"

func Connect() *sql.DB {
	db, err := sql.Open("sqlite3", "movie_review_app.db")
	if err != nil {
		panic(err)
	}
	return db
}
