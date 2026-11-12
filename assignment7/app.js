import express from "express";
import path from "path";

import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
});

app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/books", bookRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});