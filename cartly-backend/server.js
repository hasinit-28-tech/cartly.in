const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


// ==========================================
// ROUTES
// ==========================================

const orderRoutes = require("./routes/Orders");


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json());


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 Cartly backend is running!",

        mongodb:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Not connected"

    });

});


// ==========================================
// ORDER ROUTES
// ==========================================

app.use("/api/orders", orderRoutes);


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(MONGO_URI)

    .then(() => {

        console.log(
            "✅ MongoDB connected successfully!"
        );

        app.listen(PORT, () => {

            console.log(
                `🚀 Cartly backend running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            "❌ MongoDB connection failed:"
        );

        console.error(
            error.message
        );

    });