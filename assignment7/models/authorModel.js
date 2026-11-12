import { db } from "../database/database.js";

export function getAllAuthors() {
    return db.prepare(`
        SELECT * FROM authors;
    `).all();
}
export function getAuthorByID(id) {
    return db.prepare(`
        SELECT authors.id, authors.name, authors.country, authors.birth,
               books.id AS book_id, books.title
        FROM authors
        JOIN authored, books
            ON authors.id = authored.author_id
            AND books.id = authored.book_id
        WHERE authors.id = ?;
    `).all(id);
}