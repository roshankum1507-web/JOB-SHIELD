const mongoose = require("mongoose");
const JobAnalysis = require("../models/JobAnalysis");
const scamDetectionService = require("../services/scamDetectionService");

// Analyze a job
const analyzeJob = async (req, res) => {
    try {
        const {
            jobTitle,
            companyName,
            jobDescription,
            companyWebsite,
            salary,
            location
        } = req.body;

        // Run scam detection service
        const result = scamDetectionService({
            jobTitle,
            companyName,
            jobDescription,
            companyWebsite,
            salary,
            location
        });

        // Save analysis to MongoDB
        const analysis = await JobAnalysis.create({
            jobTitle,
            companyName,
            jobDescription,
            companyWebsite: companyWebsite || "",
            salary: salary || "",
            location: location || "",

            scamScore: result.scamScore,
            confidenceScore: result.confidenceScore,
            riskLevel: result.riskLevel,

            redFlags: [
                ...result.redFlags,
                ...result.warnings
            ],

            recommendation: result.recommendation,

            analysisDetails:
                `Detected ${result.redFlags.length + result.warnings.length} potential risk indicator(s).`
        });

        res.status(201).json({
            success: true,
            message: "Job analysis completed successfully",
            data: {
                ...analysis.toObject(),

                detection: {
                    scamScore: result.scamScore,
                    confidenceScore: result.confidenceScore,
                    riskLevel: result.riskLevel,
                    redFlags: result.redFlags,
                    warnings: result.warnings,
                    positiveSignals: result.positiveSignals
                }
            }
        });

    } catch (error) {
        console.error("Job analysis error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while analyzing job"
        });
    }
};


// Get all analyses
const getAnalyses = async (req, res) => {
    try {
        const analyses = await JobAnalysis
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: analyses.length,
            data: analyses
        });

    } catch (error) {
        console.error("Fetch analyses error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching analyses"
        });
    }
};


// Get analysis by ID
const getAnalysisById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid analysis ID"
            });
        }

        const analysis = await JobAnalysis.findById(id);

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        res.status(200).json({
            success: true,
            data: analysis
        });

    } catch (error) {
        console.error("Fetch analysis error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching analysis"
        });
    }
};


// Delete analysis
const deleteAnalysis = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid analysis ID"
            });
        }

        const analysis = await JobAnalysis.findByIdAndDelete(id);

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Analysis deleted successfully"
        });

    } catch (error) {
        console.error("Delete analysis error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while deleting analysis"
        });
    }
};


module.exports = {
    analyzeJob,
    getAnalyses,
    getAnalysisById,
    deleteAnalysis
};