const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "JOB SHIELD API is running"
    });
});

// Analysis routes
app.use("/api", analysisRoutes);

// Centralized error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`JOB SHIELD server running on port ${PORT}`);
});