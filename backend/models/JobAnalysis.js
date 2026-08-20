const mongoose = require("mongoose");

const jobAnalysisSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        jobDescription: {
            type: String,
            required: true
        },

        companyWebsite: {
            type: String,
            default: ""
        },

        salary: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        scamScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        confidenceScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        riskLevel: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            required: true
        },

        redFlags: [
            {
                type: String
            }
        ],

        recommendation: {
            type: String,
            default: ""
        },

        analysisDetails: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("JobAnalysis", jobAnalysisSchema);