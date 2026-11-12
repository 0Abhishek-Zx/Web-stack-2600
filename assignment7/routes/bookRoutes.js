import express from "express";

import {
    showBooks,
    showBookById
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", showBooks);
router.get("/:id", showBookById);

export default router;