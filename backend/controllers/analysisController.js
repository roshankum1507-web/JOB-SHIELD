const {
    analyzeJobPosting
} = require("../services/fraudDetectionService");

const analyzeJob = (req, res) => {
    try {
        const jobData = req.body;

        // Basic validation
        if (!jobData.description) {
            return res.status(400).json({
                success: false,
                message: "Job description is required"
            });
        }

        const result = analyzeJobPosting(jobData);

        res.status(200).json({
            success: true,
            message: "Job posting analyzed successfully",
            data: result
        });

    } catch (error) {
        console.error("Analysis error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to analyze job posting"
        });
    }
};

module.exports = {
    analyzeJob
};