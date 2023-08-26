package request

import "time"

type MovieRequest struct {
	Title       string     `json:"title"`
	Genre       string     `json:"genre"`
	ReleaseDate *time.Time `json:"release_date"`
	EndDate     *time.Time `json:"end_date"`
	IsShowing   bool       `json:"is_showing"`
}
