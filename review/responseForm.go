package review

import "time"

type response struct {
	ID        uint      `json:"id"`
	MovieID   uint      `json:"movieID"`
	Rating    float64   `json:"rating"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m Review) fromEntity() response {
	return response{
		ID:        m.ID,
		MovieID:   m.MovieID,
		Rating:    m.Rating,
		Content:   m.Content,
		CreatedAt: m.CreatedAt,
		UpdatedAt: m.UpdatedAt,
	}
}
