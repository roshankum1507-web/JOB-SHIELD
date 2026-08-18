const express = require("express");

const {
    analyzeJob
} = require("../controllers/analysisController");

const router = express.Router();

router.post("/analyze", analyzeJob);

module.exports = router;