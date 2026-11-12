import { getAllAuthors ,getAuthorByID} from "../models/authorModel.js";

export function showAuthors(req, res) {
    const authors = getAllAuthors();

    res.json(authors);
}

export function showAuthorsByID(req, res) {
    const selectedId = req.params.id;

    const booksbyauthor = getAuthorByID(selectedId);

    if (booksbyauthor.length === 0) {
        return res.status(404).json({
            error: "Author not found"
        });
    }


    const author = {
        id: booksbyauthor[0].id,
        name: booksbyauthor[0].name,
        country: booksbyauthor[0].country,
        birth: booksbyauthor[0].birth,

        books: booksbyauthor.map(book => ({
            id: book.book_id,
            title: book.title,
            link: `/api/v1/books/${book.book_id}`
        }))
    };

    res.json(author);
}