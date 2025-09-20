const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is mandatory"],
            trim: true,
            minlength: 1
        },
        author: {
            type: String,
            required: [true, "Author is mandatory"],
            trim: true,
            minlength: 1
        },
        ISBN: {
            type: String,
            unique: true, // each book should have unique ISBN
            trim: true,
            validate: {
                validator: function (v) {
                    // ISBN-10 or ISBN-13 basic regex
                    return /^(?:\d{9}[\dXx]|\d{13})$/.test(v);
                },
                message: props => `${props.value} is not a valid ISBN`
            }
        },
        publishedYear: {
            type: Number
        },
        pages: {
            type: Number,
            min: [1, "Pages must be at least 1"]
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;