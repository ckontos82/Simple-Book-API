const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./db/mongo");
const routes = require("./routes/books.routes");
const errorMiddleware = require("./middleware/error");

dotenv.config();
const app = express();
app.use(express.json());

connect(process.env.MONGODB_URI).catch((err) => {
    console.error("Failed to connect MongoDB", err);
    process.exit(1);
});

app.use("/api/books", routes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use(errorMiddleware);

module.exports = app;