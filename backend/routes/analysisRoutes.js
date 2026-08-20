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

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Analyze a job
router.post(
    "/analyze",
    authMiddleware,
    validateJobAnalysis,
    analyzeJob
);

// Get all analyses
router.get(
    "/analyses",
    authMiddleware,
    getAnalyses
);

// Get one analysis
router.get(
    "/analyses/:id",
    authMiddleware,
    getAnalysisById
);

// Delete an analysis
router.delete(
    "/analyses/:id",
    authMiddleware,
    deleteAnalysis
);

module.exports = router;