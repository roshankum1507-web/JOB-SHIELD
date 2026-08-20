const express = require("express");

const {
    analyzeJob,
    getAnalyses,
    getAnalysisById,
    deleteAnalysis
} = require("../controllers/analysisController");

const {
    validateJobAnalysis
} = require("../middleware/validation");

const router = express.Router();

// Analyze a job
router.post(
    "/analyze",
    validateJobAnalysis,
    analyzeJob
);

// Get all analyses
router.get("/analyses", getAnalyses);

// Get one analysis
router.get("/analyses/:id", getAnalysisById);

// Delete an analysis
router.delete("/analyses/:id", deleteAnalysis);

module.exports = router;