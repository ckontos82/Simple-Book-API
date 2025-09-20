const express = require("express");
const repo = require("../data/books.repo");

const router = express.Router();

// GET: /api/books
router.get("/", async (req, res, next) => {
    try {
        const books = await repo.getAllBooks();
        return res.json(books);
    } catch (err) {
        next(err);
    }
});

// GET: /api/books/:id
router.get("/:id", async (req, res, next) => {
    try {
        const book = await repo.getById(req.params.id);
        if (!book)
            return res.status(404).json({ error: 'Not found' });

        return res.json(book);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

// GET: /api/books/:title
router.get("/title/:title", async (req, res, next) => {
    try {
        const book = await repo.getByTitle(req.params.title);
        if (!book)
            return res.status(404).json({ error: 'Not found' });

        return res.json(book);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

// POST /api/books
router.post("/", async (req, res, next) => {
    try {
        const created = await repo.create(req.body);
        return res.status(201).location(`/api/books/${created.id}`).json(created);
    } catch (err) {
        if (err.name === "ValidationError") err.status = 400;
        if (err.code === 11000) { err.status = 409; err.message = "Duplicate key"; }
        next(err);
    }
});

// POST /api/books/batch
router.post("/batch", async (req, res, next) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: "Request body must be a non-empty array" });
        }
        const created = await repo.createMany(req.body);
        return res.status(201).json(created);
    } catch (err) {
        if (err.name === "ValidationError") err.status = 400;
        if (err.code === 11000) { err.status = 409; err.message = "Duplicate key"; }
        next(err);
    }
});

// PATCH /api/books/:id
router.patch("/:id", async (req, res, next) => {
    try {
        const updated = await repo.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: "Not found" });
        return res.json(updated);
    } catch (err) {
        if (err.name === "ValidationError") err.status = 400;
        err.status ??= 400;
        next(err);
    }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const removed = await repo.remove(req.params.id);
        if (!removed) return res.status(404).json({ error: "Not found" });
        return res.status(204).send();
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

module.exports = router;