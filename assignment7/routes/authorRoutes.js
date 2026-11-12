import express from "express";
import { showAuthors, showAuthorsByID } from "../controllers/authorController.js";

const router = express.Router();

router.get("/", showAuthors);
router.get("/:id", showAuthorsByID);
export default router;