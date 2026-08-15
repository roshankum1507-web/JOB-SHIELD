# JOBSHIELD

### AI-Powered Detection of Fake Job Postings & Recruitment Scams

> Omnikon National Hackathon 2026  
> Problem Statement: Omni_CyberTech_10  
> Theme: Cybersecurity, Blockchain & Digital Trust

---

## Overview

JobShield is a proposed AI-assisted web platform designed to help job seekers identify potentially fraudulent job postings and recruitment scams before they become victims.

The platform analyzes job postings and available recruiter/company information, detects suspicious patterns, and generates an understandable Recruitment Risk Score along with the reasons behind the assessment.

The goal is not to simply label a job as "real" or "fake", but to help users understand **why a job posting may be risky** and what precautions they should take.

---

## Problem

Fake job postings and recruitment scams can target students, fresh graduates, and job seekers through attractive offers, unrealistic salaries, suspicious recruiter communication, requests for upfront payments, and misleading company information.

Many users are not aware of the warning signs associated with these scams.

Existing approaches often provide limited information to users and may not clearly explain the reasons behind a warning.

JobShield aims to provide an accessible first layer of protection by analyzing multiple risk indicators and presenting the findings in a simple and explainable format.

---

## Proposed Solution

JobShield will allow users to submit relevant job information such as:

- Job posting URL
- Job description
- Recruiter contact information
- Company information
- Salary and benefit details

The system will analyze the available information using a combination of:

- Rule-based scam indicators
- Text and NLP analysis
- Recruiter and company information checks
- Domain and contact consistency checks
- Risk scoring

The final result will provide:

```text
Recruitment Risk Score
        ↓
Risk Level
        ↓
Detected Warning Signals
        ↓
Explanation
        ↓
Recommended Precautions

Core Features
1. Job Posting Analyzer

Users can submit a job posting or paste its description for analysis.

2. Recruitment Risk Score

The system generates a risk score representing the likelihood of suspicious characteristics.

Example:

Risk Score: 87 / 100
Risk Level: HIGH RISK
3. Explainable Detection

Instead of providing only a result, JobShield explains the detected warning signals.

Possible signals include:

Upfront payment requests
Unrealistic salary claims
Urgency-based language
Suspicious contact information
Company-domain inconsistencies
Missing or unverifiable company information
Requests for sensitive personal information
4. AI/NLP Analysis

An AI/NLP layer will assist in identifying contextual patterns within job descriptions and recruitment messages that may indicate suspicious behavior.

5. Analysis History

Authenticated users will be able to view previously analyzed job postings and their results.

6. User Feedback

Users can provide feedback about analyzed postings to help improve future detection rules and analysis.

7. Safety Recommendations

The platform will provide practical precautions based on the detected risk signals.
