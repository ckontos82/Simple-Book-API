const Book = require("../models/book.mongo");

async function getAllBooks() {
    return await Book.find().lean();
}

async function getById(id) {
    return await Book.findById(id).lean();
}

async function getByTitle(title) {
    return await Book.find({
        title: { $regex: title, $options: "i" }
    }).lean();
}

async function create(book) {
    const doc = await Book.create(book);
    return doc.toJSON();
}

async function createMany(books) {
    const docs = await Book.insertMany(books, { ordered: true });
    return docs.map(b => b.toJSON());
}

async function update(id, partial) {
    return await Book.findByIdAndUpdate(id, partial, {
        new: true,
        runValidators: true,
        lean: true,
    });
}

async function remove(id) {
    return await Book.findByIdAndDelete(id).lean();
}

module.exports = { getAllBooks, getById, getByTitle, create, createMany, update, remove };