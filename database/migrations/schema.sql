CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre ENUM('스릴러', '로맨스', '코믹', '액션') NOT NULL,
    release_date DATE,
    end_date DATE,
    is_showing BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE reviews (
     id INT AUTO_INCREMENT PRIMARY KEY,
     movie_id INT,
     rating INT CHECK (rating >= 1 AND rating <= 5),
     content TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     deleted_at TIMESTAMP NULL
     FOREIGN KEY (movie_id) REFERENCES movies(id)
);
