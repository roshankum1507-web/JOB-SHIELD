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
