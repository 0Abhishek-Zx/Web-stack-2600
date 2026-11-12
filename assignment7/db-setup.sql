DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id INTEGER,
    reviewer TEXT,
    rating INTEGER,
    book_id INTEGER,
    comment TEXT,

    PRIMARY KEY (id),
    FOREIGN KEY (book_id) REFERENCES books (id),
    CONSTRAINT rating_range CHECK (rating >= 0 AND rating <= 5)
);