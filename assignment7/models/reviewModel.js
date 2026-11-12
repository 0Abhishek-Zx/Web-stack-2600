import { db } from "../database/database.js";

export function createReview(reviewer, book_id, rating, comment) {
    const sql = db.prepare(`
        INSERT INTO reviews (reviewer, book_id, rating, comment)
        VALUES (?, ?, ?, ?);
    `);

    const result = sql.run(reviewer, book_id, rating, comment);

    return result.lastInsertRowid;
}




export function getReviewById(id) {
    return db.prepare(`
        SELECT *
        FROM reviews
        WHERE id = ?;
    `).get(id)}