import {
    getBooks,
    getBookById,

} from "../models/bookModel.js";

export function showBooks(req, res) {
    const page = Number(req.query.page ?? 0);
    const format = req.query.format ?? "hardcover";

    const offset = page * 10;

    const books = getBooks(format, offset);

    res.json(books);
}

export function showBookById(req, res) {
    const selectedId = req.params.id;

    const selectedBook = getBookById(selectedId);

    if (!selectedBook || selectedBook.length === 0) {
        return res.status(404).json({
            status: 404,
            message: "A book with that ID was not found"
        });
    }

    const Book = {
        id: selectedBook[0].id,
        isbn: selectedBook[0].isbn,
        title: selectedBook[0].title,
        publisher_Id: selectedBook[0].publisher_id,
        format: selectedBook[0].format,
        pages: selectedBook[0].pages,
        published: selectedBook[0].year,
        publisher: selectedBook[0].publisher,

        authors: selectedBook.map(author => ({
            name: author.name,
            author_id: author.author_id,
            link: `/api/v1/authors/${author.author_id}`
        }))
    };

    res.json(Book);
}