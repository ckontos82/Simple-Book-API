const mongoose = require("mongoose");

function slugify(name) {
    return name
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const AuthorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is mandatory"],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        birthYear: {
            type: Number,
            min: [0, "Birth year must be positive"]
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
