import { createReview, getReviewById } from '../models/reviewModel.js';

export function addReview(req, res) {
    try {
        const { reviewer, book_id, rating, comment } = req.body;

        const review_id = createReview(
            reviewer,
            book_id,
            rating,
            comment
        );

        const review = getReviewById(review_id);

        res.set('Location', `/api/v1/reviews/${review_id}`);

        res.status(201).json({
            status: 201,
            message: 'Review created successfully',
            links: {
                by_review_id: `/api/v1/reviews/${review_id}`,
                by_book_id: `/api/v1/reviews?book_id=${book_id}`
            },
            review
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

export function displayReview(req, res) {
    try {
        const { id } = req.params;

        const review = getReviewById(id);

        if (review) {
            res.status(200).json({
                status: 200,
                review
            });
        } else {
            res.status(404).json({
                message: 'Review not found'
            });
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}