const mongoose = require("mongoose");

let isConnected = false;

async function connect(uri) {
    if (isConnected) return;

    mongoose.set("strictQuery", true);

    await mongoose.connect(uri);

    isConnected = true;

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
        isConnected = false;
    });
}

module.exports = { connect };

