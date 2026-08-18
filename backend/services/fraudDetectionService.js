const analyzeJobPosting = (jobData) => {
    const {
        jobTitle,
        companyName,
        description,
        salary,
        location,
        recruiterEmail
    } = jobData;

    let riskScore = 0;
    const redFlags = [];

    const text = `
        ${jobTitle || ""}
        ${companyName || ""}
        ${description || ""}
        ${salary || ""}
        ${location || ""}
    `.toLowerCase();

    // 1. Payment-related red flags
    const paymentKeywords = [
        "registration fee",
        "processing fee",
        "security deposit",
        "pay money",
        "payment required",
        "joining fee",
        "training fee"
    ];

    paymentKeywords.forEach((keyword) => {
        if (text.includes(keyword)) {
            riskScore += 30;

            redFlags.push(
                `Possible payment request: "${keyword}"`
            );
        }
    });

    // 2. Sensitive information
    const sensitiveKeywords = [
        "bank account",
        "bank details",
        "upi",
        "credit card",
        "debit card",
        "otp",
        "password"
    ];

    sensitiveKeywords.forEach((keyword) => {
        if (text.includes(keyword)) {
            riskScore += 25;

            redFlags.push(
                `Sensitive information requested: "${keyword}"`
            );
        }
    });

    // 3. Suspicious recruitment platforms
    if (text.includes("telegram")) {
        riskScore += 10;
        redFlags.push("Recruitment involves Telegram");
    }

    if (text.includes("whatsapp")) {
        riskScore += 10;
        redFlags.push("Recruitment involves WhatsApp");
    }

    // 4. Pressure tactics
    const pressureKeywords = [
        "urgent hiring",
        "immediate joining",
        "join immediately",
        "limited seats",
        "act now",
        "hurry"
    ];

    pressureKeywords.forEach((keyword) => {
        if (text.includes(keyword)) {
            riskScore += 10;

            redFlags.push(
                `Pressure tactic detected: "${keyword}"`
            );
        }
    });

    // 5. Personal email
    if (recruiterEmail) {
        const email = recruiterEmail.toLowerCase();

        const personalEmailProviders = [
            "@gmail.com",
            "@yahoo.com",
            "@outlook.com",
            "@hotmail.com"
        ];

        const isPersonalEmail = personalEmailProviders.some(
            (provider) => email.endsWith(provider)
        );

        if (isPersonalEmail) {
            riskScore += 15;
            redFlags.push(
                "Recruiter appears to use a personal email address"
            );
        }
    }

    // Keep score between 0 and 100
    riskScore = Math.min(riskScore, 100);

    // Determine risk level
    let riskLevel;

    if (riskScore >= 70) {
        riskLevel = "HIGH";
    } else if (riskScore >= 40) {
        riskLevel = "MEDIUM";
    } else {
        riskLevel = "LOW";
    }

    // Recommendation
    let recommendation;

    if (riskLevel === "HIGH") {
        recommendation =
            "Avoid this opportunity until the employer and recruiter are independently verified. Do not send money or sensitive information.";
    } else if (riskLevel === "MEDIUM") {
        recommendation =
            "Proceed carefully. Verify the company, recruiter, job posting and communication channels before sharing personal information.";
    } else {
        recommendation =
            "No major scam indicators were detected. However, independently verify the employer before applying or sharing sensitive information.";
    }

    return {
        riskScore,
        riskLevel,
        redFlags,
        recommendation
    };
};

module.exports = {
    analyzeJobPosting
};