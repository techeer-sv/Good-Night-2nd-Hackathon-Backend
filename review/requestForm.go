package review

type Request struct {
	MovieID uint    `json:"movieID" binding:"required"`
	Rating  float64 `json:"rating" binding:"required"`
	Content string  `json:"content" binding:"required"`
}

func (r Request) toEntity() Review {
	return Review{
		MovieID: r.MovieID,
		Rating:  r.Rating,
		Content: r.Content,
	}
}
