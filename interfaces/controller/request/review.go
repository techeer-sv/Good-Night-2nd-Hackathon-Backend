package request

type Review struct {
	MovieID int    `json:"movie_id"`
	Rating  int    `json:"rating"`
	Content string `json:"content"`
}
