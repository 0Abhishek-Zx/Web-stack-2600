import { db } from "../database/database.js";

export function getBooks(format, offset) {
    console.log("Books table:", db.prepare(
        "SELECT COUNT(*) AS total FROM books"
    ).get());

    return db.prepare(`
        SELECT id, isbn, title, format
        FROM books
        WHERE format = ?
        LIMIT 10 OFFSET ?;
    `).all(format, offset);
}
export function getBookById(id) {
    return db.prepare(`
        SELECT
            books.id,
            books.isbn,
            books.title,
            books.publisher_id,
            books.format,
            books.pages,
            books.year,
            publishers.publisher,
            authors.id AS author_id,
            authors.name
        FROM books
        JOIN publishers
            ON books.publisher_id = publishers.id
        JOIN authored
            ON books.id = authored.book_id
        JOIN authors
            ON authors.id = authored.author_id
        WHERE books.id = ?;
    `).all(id);
}