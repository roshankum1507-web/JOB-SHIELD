# JOBSHIELD

### AI-Powered Detection of Fake Job Postings & Recruitment Scams

> Omnikon National Hackathon 2026  
> Problem Statement: Omni_CyberTech_10  
> Theme: Cybersecurity, Blockchain & Digital Trust

---

## Overview

JobShield is a proposed AI-assisted web platform designed to help job seekers identify potentially fraudulent job postings and recruitment scams before they become victims.

The platform analyzes job postings and available recruiter/company information, detects suspicious patterns, and generates an understandable **Recruitment Risk Score** along with the reasons behind the assessment.

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

    Recruitment Risk Score
            ↓
        Risk Level
            ↓
    Detected Warning Signals
            ↓
        Explanation
            ↓
    Recommended Precautions

---

## Core Features

### 1. Job Posting Analyzer

Users can submit a job posting URL or paste the complete job description for analysis.

### 2. Recruitment Risk Score

The system generates an overall risk score and categorizes the posting into levels such as:

- Low Risk
- Medium Risk
- High Risk

### 3. Explainable Detection

Instead of providing only a result, JobShield explains the detected warning signals.

Possible signals include:

- Upfront payment requests
- Unrealistic salary claims
- Urgency-based language
- Suspicious recruiter contact information
- Company-domain inconsistencies
- Missing or unverifiable company information
- Requests for sensitive personal information

### 4. AI/NLP Analysis

An AI/NLP layer will assist in identifying contextual patterns within job descriptions and recruitment messages that may indicate fraudulent behavior.

### 5. Recruiter & Company Verification

The system will analyze available recruiter and company information to identify inconsistencies or suspicious details.

### 6. Analysis History

Authenticated users can view and manage their previously analyzed job postings and risk reports.

### 7. User Feedback & Reporting

Users can provide feedback and report suspicious job postings to support future improvements to the detection system.

### 8. Safety Recommendations

The platform will provide practical precautions based on the detected risk signals, helping users make safer decisions before sharing money or sensitive information.

---

## System Architecture

The planned system architecture consists of the following components:

    USER
      |
      v
    React Web Application
      |
      | REST API
      v
    Node.js + Express Backend
      |
      v
    Analysis Orchestrator
      |
      +----------------+----------------+----------------+
      |                |                |                |
      v                v                v                |
    Rule-Based       AI / NLP       Recruiter &         |
    Detection        Analysis       Company             |
    Engine                          Verification         |
      |                |                |                |
      +----------------+----------------+----------------+
                       |
                       v
                Risk Scoring Engine
                       |
                       v
                Explainable Analysis
                       |
                       v
               Safety Recommendations
                       |
                       v
                    MongoDB

### Architecture Flow

1. **User Input** → User submits a job URL, job description, recruiter details, or company information.
2. **React Frontend** → Collects input and communicates with the backend through REST APIs.
3. **Node.js + Express Backend** → Validates requests and coordinates the analysis process.
4. **Analysis Orchestrator** → Sends relevant information to different detection components.
5. **Detection Layer** → Combines rule-based detection, AI/NLP analysis, and recruiter/company verification.
6. **Risk Scoring Engine** → Calculates the overall Recruitment Risk Score using the detected signals.
7. **Explainable Analysis** → Converts detected signals into understandable reasons and safety recommendations.
8. **MongoDB** → Stores authenticated users, analysis history, detected signals, and feedback.

### Security Layer

- JWT-based authentication
- Input validation
- Protected API routes
- Helmet security headers
- Rate limiting
- Secure handling of user data

---

## Technology Stack

### Frontend

- React.js
- Tailwind CSS
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB

### Authentication & Security

- JWT Authentication
- Express Validator
- Helmet
- Rate Limiting
- Protected API Routes
- Secure Data Handling

### AI / NLP

- NLP / LLM-based Analysis
- Rule-Based Detection
- Risk Scoring Engine

### Development Tools

- Git
- GitHub
- Visual Studio Code

### Deployment

- Frontend: Cloud Deployment
- Backend: Cloud Deployment
- Database: MongoDB Atlas

---

## Risk Scoring Approach

JobShield will evaluate multiple indicators instead of relying on a single factor to determine whether a job posting may be suspicious.

The system will assign different weights to detected risk signals and combine them to generate an overall **Recruitment Risk Score**.

### Risk Score Model

    Recruitment Risk Score =
        Textual Risk Signals
      + Recruiter & Contact Signals
      + Company Verification Signals
      + Domain / URL Signals
      + Behavioral / Request Signals

### Example Risk Indicators

| Risk Indicator | Weight |
|---|---|
| Upfront payment request | High |
| Suspicious recruiter contact | High |
| Domain / company mismatch | High |
| Unrealistic compensation | Medium |
| Urgency-based language | Medium |
| Missing company information | Medium |
| Request for sensitive information | High |

### Risk Levels

| Score Range | Risk Level |
|---|---|
| 0–30 | Low Risk |
| 31–60 | Medium Risk |
| 61–100 | High Risk |

### Explainable Results

The system will not only provide a score but will also show the major factors that contributed to the assessment.

Example:

    Recruitment Risk Score: 82 / 100

    Risk Level: HIGH RISK

    Detected Signals:
    • Upfront payment request
    • Recruiter email does not match company domain
    • Unrealistic salary claim
    • Limited verifiable company information

    Recommendation:
    Verify the employer independently before sharing
    money or sensitive personal information.

> The initial scoring weights are conceptual and will be refined through testing and implementation.

---

## Example User Experience

    User submits job posting
              ↓
    JobShield analyzes the information
              ↓
    Risk signals are detected
              ↓
    Risk score is calculated
              ↓
    AI/NLP analysis provides contextual insights
              ↓
    User receives an explainable risk report
              ↓
    Safety recommendations are provided

### Example Result

    RECRUITMENT RISK SCORE

    82 / 100

    HIGH RISK

    Detected Signals:

    • Upfront payment request
    • Recruiter contact does not match company domain
    • Unrealistic salary claim
    • Limited verifiable company information

    Recommendation:

    Verify the employer independently.

    Do not send money or sensitive personal information
    until the opportunity has been verified.

---

## Project Goals

- Help job seekers recognize potential recruitment scams.
- Make scam indicators easier to understand.
- Provide explainable risk assessments instead of simple "real/fake" labels.
- Combine deterministic rules with AI-assisted analysis.
- Build a practical cybersecurity-focused full-stack application.
- Provide actionable safety recommendations to users.
- Create an extensible detection system that can be improved over time.

---

## Implementation Plan

### Phase 1 — Foundation

- Finalize requirements
- Design system architecture
- Design database schema
- Create frontend wireframes

### Phase 2 — Full-Stack Development

- Develop React frontend
- Develop Node.js and Express backend
- Configure MongoDB
- Implement authentication
- Develop REST APIs

### Phase 3 — Detection Engine

- Implement rule-based scam indicators
- Develop risk scoring mechanism
- Implement recruiter and company checks
- Add input validation

### Phase 4 — AI/NLP Integration

- Integrate NLP/LLM-based analysis
- Generate contextual explanations
- Combine AI analysis with deterministic signals

### Phase 5 — Product Features

- Analysis history
- User feedback and reporting
- Safety recommendations
- Dashboard improvements

### Phase 6 — Testing & Deployment

- Functional testing
- API and security testing
- Detection testing
- Deployment
- Documentation

---

## Expected Impact

JobShield aims to provide job seekers with a simple first layer of protection against recruitment scams.

Potential benefits include:

- Increased awareness of recruitment fraud
- Faster identification of suspicious job postings
- Better understanding of scam indicators
- Reduced risk of users sending money to fraudulent recruiters
- Reduced exposure of sensitive personal information
- Improved digital safety for students and job seekers

---

## Future Scope

Possible future improvements include:

- Browser extension for real-time job-posting analysis
- Multi-language scam detection
- Integration with verified company information
- Community-driven scam reporting
- Recruiter and company reputation scoring
- Email and recruitment-message analysis
- Advanced machine-learning classification
- Real-time threat intelligence integration

---

## Project Status

**Current Status:** Concept / Round 1 Idea Submission

This repository has been created for the **Omnikon National Hackathon 2026 Round 1 submission**.

No working prototype is required at this stage.

Implementation will be developed if the project is shortlisted for the next round.

---

## Repository Structure

The project structure will be developed during implementation.

Planned structure:

    jobshield-recruitment-scam-detector/
    │
    ├── frontend/
    │
    ├── backend/
    │
    ├── README.md
    │
    └── .gitignore

---

## Omnikon 2026

**Hackathon:** Omnikon National Hackathon 2026  
**Problem Statement:** Omni_CyberTech_10  
**Project:** JobShield  
**Participation:** Individual  
**Theme:** Cybersecurity, Blockchain & Digital Trust

---

## Disclaimer

JobShield is intended to function as a decision-support and cybersecurity awareness tool.

A high or low risk score should not be treated as definitive proof that a job posting is fraudulent or legitimate.

Users should independently verify employers and avoid sharing money or sensitive information when appropriate.
