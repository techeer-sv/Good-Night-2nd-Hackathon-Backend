CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(10) CHECK (genre IN ('스릴러', '로맨스', '코믹', '액션')) NOT NULL,
    release_date DATE,
    end_date DATE,
    is_showing BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL
);

CREATE TABLE reviews (
     id SERIAL PRIMARY KEY,
     movie_id INT,
     rating INT CHECK (rating >= 1 AND rating <= 5),
     content TEXT,
     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
     deleted_at TIMESTAMPTZ NULL,
     FOREIGN KEY (movie_id) REFERENCES movies(id)
);
