const scamDetectionService = (jobData) => {
    const {
        jobTitle = "",
        companyName = "",
        jobDescription = "",
        companyWebsite = "",
        salary = "",
        location = ""
    } = jobData;

    const text = `
        ${jobTitle}
        ${companyName}
        ${jobDescription}
        ${companyWebsite}
        ${salary}
        ${location}
    `.toLowerCase();

    let score = 0;

    const redFlags = [];
    const warnings = [];
    const positiveSignals = [];

    // --------------------------------
    // 1. PAYMENT / MONEY REQUESTS
    // --------------------------------

    const paymentPatterns = [
        {
            keywords: ["registration fee", "registration fees"],
            score: 30,
            message: "Job asks for a registration fee."
        },
        {
            keywords: ["processing fee", "processing fees"],
            score: 25,
            message: "Job mentions a processing fee."
        },
        {
            keywords: ["security deposit"],
            score: 30,
            message: "Job asks for a security deposit."
        },
        {
            keywords: ["pay upfront", "upfront payment"],
            score: 30,
            message: "Job requires an upfront payment."
        },
        {
            keywords: ["pay money", "send money"],
            score: 30,
            message: "Job asks the applicant to send money."
        }
    ];

    for (const pattern of paymentPatterns) {
        if (pattern.keywords.some(keyword => text.includes(keyword))) {
            score += pattern.score;
            redFlags.push(pattern.message);
        }
    }

    // --------------------------------
    // 2. SENSITIVE INFORMATION
    // --------------------------------

    const sensitivePatterns = [
        {
            keywords: ["share otp", "send otp", "provide otp"],
            score: 40,
            message: "Job asks for an OTP."
        },
        {
            keywords: ["bank account details", "bank details"],
            score: 35,
            message: "Job asks for banking information."
        },
        {
            keywords: ["credit card details", "debit card details"],
            score: 40,
            message: "Job asks for card information."
        },
        {
            keywords: ["cvv"],
            score: 40,
            message: "Job mentions CVV information."
        }
    ];

    for (const pattern of sensitivePatterns) {
        if (pattern.keywords.some(keyword => text.includes(keyword))) {
            score += pattern.score;
            redFlags.push(pattern.message);
        }
    }

    // --------------------------------
    // 3. SUSPICIOUS COMMUNICATION
    // --------------------------------

    if (
        text.includes("whatsapp only") ||
        text.includes("contact on whatsapp")
    ) {
        score += 15;

        warnings.push(
            "Recruitment appears to rely heavily on WhatsApp."
        );
    }

    if (
        text.includes("telegram only") ||
        text.includes("contact on telegram")
    ) {
        score += 15;

        warnings.push(
            "Recruitment appears to rely heavily on Telegram."
        );
    }

    // --------------------------------
    // 4. URGENCY
    // --------------------------------

    const urgencyKeywords = [
        "urgent hiring",
        "urgent vacancy",
        "apply immediately",
        "limited seats",
        "act now",
        "hurry"
    ];

    const urgencyFound = urgencyKeywords.some(keyword =>
        text.includes(keyword)
    );

    if (urgencyFound) {
        score += 10;

        warnings.push(
            "Job posting uses urgency-based recruitment language."
        );
    }

    // --------------------------------
    // 5. GUARANTEED EMPLOYMENT
    // --------------------------------

    const guaranteeKeywords = [
        "guaranteed job",
        "100% guaranteed",
        "job guaranteed",
        "guaranteed placement"
    ];

    if (
        guaranteeKeywords.some(keyword =>
            text.includes(keyword)
        )
    ) {
        score += 20;

        redFlags.push(
            "Job appears to guarantee employment or placement."
        );
    }

    // --------------------------------
    // 6. MISSING COMPANY WEBSITE
    // --------------------------------

    if (!companyWebsite) {
        score += 10;

        warnings.push(
            "No company website was provided."
        );
    } else {
        positiveSignals.push(
            "Company website was provided."
        );
    }

    // --------------------------------
    // 7. EMAIL DOMAIN ANALYSIS
    // --------------------------------

    const freeEmailProviders = [
        "@gmail.com",
        "@yahoo.com",
        "@hotmail.com",
        "@outlook.com",
        "@protonmail.com"
    ];

    const hasFreeEmail = freeEmailProviders.some(domain =>
        text.includes(domain)
    );

    if (hasFreeEmail) {
        score += 15;

        warnings.push(
            "Recruitment communication may use a free email provider instead of a company domain."
        );
    }

    // --------------------------------
    // 8. UNREALISTIC JOB CLAIMS
    // --------------------------------

    const unrealisticPatterns = [
        "earn 50000 per week",
        "earn 1 lakh per month",
        "earn ₹1 lakh",
        "no skills required",
        "no interview required",
        "easy money",
        "work 1 hour a day"
    ];

    if (
        unrealisticPatterns.some(keyword =>
            text.includes(keyword)
        )
    ) {
        score += 20;

        warnings.push(
            "Job contains potentially unrealistic employment or income claims."
        );
    }

    // --------------------------------
    // 9. JOB DESCRIPTION QUALITY
    // --------------------------------

    if (jobDescription.length < 100) {
        score += 10;

        warnings.push(
            "Job description contains very little information."
        );
    } else {
        positiveSignals.push(
            "Job description provides reasonable detail."
        );
    }

    // --------------------------------
    // 10. DETERMINE RISK LEVEL
    // --------------------------------

    score = Math.min(score, 100);

    let riskLevel;

    if (score >= 75) {
        riskLevel = "CRITICAL";
    } else if (score >= 50) {
        riskLevel = "HIGH";
    } else if (score >= 25) {
        riskLevel = "MEDIUM";
    } else {
        riskLevel = "LOW";
    }

    // --------------------------------
    // 11. RECOMMENDATION
    // --------------------------------

    let recommendation;

    switch (riskLevel) {
        case "CRITICAL":
            recommendation =
                "Avoid this job. Multiple serious scam indicators were detected.";

            break;

        case "HIGH":
            recommendation =
                "Proceed with extreme caution. Independently verify the company before providing information or money.";

            break;

        case "MEDIUM":
            recommendation =
                "Investigate the employer carefully before applying or sharing personal information.";

            break;

        default:
            recommendation =
                "No major scam indicators were detected, but independently verify the employer before proceeding.";
    }
    const totalSignals =
        redFlags.length +
        warnings.length +
        positiveSignals.length;

    let confidenceScore = 50;

    if (totalSignals >= 5) {
        confidenceScore = 90;
    } else if (totalSignals >= 3) {
        confidenceScore = 80;
    } else if (totalSignals >= 2) {
        confidenceScore = 70;
    } else if (totalSignals === 1) {
        confidenceScore = 60;
    }

    if (positiveSignals.length > redFlags.length + warnings.length) {
        confidenceScore = Math.max(50, confidenceScore - 10);
    }

    confidenceScore = Math.min(confidenceScore, 95);

    return {
        scamScore: score,
        confidenceScore,
        riskLevel,
        redFlags,
        warnings,
        positiveSignals,
        recommendation
    };
};

module.exports = scamDetectionService;