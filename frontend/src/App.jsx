import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      setHistoryError("");

      const response = await fetch("http://localhost:5000/api/analyses");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load analysis history.");
      }

      setHistory(data.data || []);
    } catch (err) {
      console.error("History error:", err);
      setHistoryError(
        err.message || "Unable to connect to the JOBSHIELD server."
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const analyzeJob = async () => {
    setError("");
    setResult(null);
    setSelectedHistory(null);

    if (!jobTitle.trim()) {
      setError("Please enter the job title.");
      return;
    }

    if (!companyName.trim()) {
      setError("Please enter the company name.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    if (jobDescription.trim().length < 20) {
      setError("Job description must contain at least 20 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          companyName: companyName.trim(),
          jobDescription: jobDescription.trim(),
          companyWebsite: companyWebsite.trim(),
          salary: salary.trim(),
          location: location.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const validationMessages = data.errors
            .map((err) => err.msg)
            .join(", ");

          throw new Error(validationMessages || "Validation failed");
        }

        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.data);

      await fetchHistory();
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Unable to connect to the JOBSHIELD server.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/analyses/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete analysis.");
      }

      setHistory((previousHistory) =>
        previousHistory.filter((analysis) => analysis._id !== id)
      );

      if (selectedHistory?._id === id) {
        setSelectedHistory(null);
      }

      if (result?._id === id) {
        setResult(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Unable to delete analysis.");
    }
  };

  const viewHistoryDetails = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/analyses/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load analysis.");
      }

      setSelectedHistory(data.data);

      setTimeout(() => {
        document
          .getElementById("history-details")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Details error:", err);
      alert(err.message || "Unable to load analysis details.");
    }
  };

  const getRiskClass = (riskLevel) => {
    switch (riskLevel?.toUpperCase()) {
      case "CRITICAL":
        return "risk-critical";
      case "HIGH":
        return "risk-high";
      case "MEDIUM":
        return "risk-medium";
      case "LOW":
        return "risk-low";
      default:
        return "risk-unknown";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderAnalysisDetails = (analysis) => {
    if (!analysis) {
      return null;
    }

    return (
      <section id="history-details" className="analysis-result">
        <div className="result-header">
          <p className="section-label">ANALYSIS DETAILS</p>

          <h2>Job Safety Report</h2>

          <p>
            Analysis completed for <strong>{analysis.jobTitle}</strong> at{" "}
            <strong>{analysis.companyName}</strong>.
          </p>
        </div>

        <div className="risk-overview">
          <div className="score-card">
            <p className="result-label">SCAM RISK SCORE</p>

            <div className="score-circle">
              <span>{analysis.scamScore}</span>
              <small>/100</small>
            </div>

            <p className="score-description">
              Higher scores indicate greater scam risk.
            </p>
          </div>

          <div className="risk-card">
            <p className="result-label">RISK LEVEL</p>

            <div
              className={`risk-badge ${getRiskClass(analysis.riskLevel)}`}
            >
              {analysis.riskLevel}
            </div>

            <div className="confidence">
              <div className="confidence-header">
                <span>Confidence</span>
                <strong>{analysis.confidenceScore}%</strong>
              </div>

              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{
                    width: `${analysis.confidenceScore}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-section red-flags-section">
          <div className="result-section-header">
            <div>
              <p className="result-label">WARNING SIGNS</p>
              <h3>Red Flags Detected</h3>
            </div>

            <span className="count-badge">
              {analysis.detection?.redFlags?.length ||
                analysis.redFlags?.length ||
                0}
            </span>
          </div>

          {(
            analysis.detection?.redFlags ||
            analysis.redFlags ||
            []
          ).length > 0 ? (
            <div className="warning-list">
              {(
                analysis.detection?.redFlags ||
                analysis.redFlags ||
                []
              ).map((flag, index) => (
                <div className="warning-item" key={index}>
                  <span className="warning-icon">!</span>
                  <p>{flag}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">
              No major red flags were detected.
            </p>
          )}
        </div>

        {analysis.detection?.warnings?.length > 0 && (
          <div className="result-section">
            <div className="result-section-header">
              <div>
                <p className="result-label">ADDITIONAL CONCERNS</p>
                <h3>Warnings</h3>
              </div>
            </div>

            <div className="warning-list">
              {analysis.detection.warnings.map((warning, index) => (
                <div className="warning-item warning-yellow" key={index}>
                  <span className="warning-icon">!</span>
                  <p>{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.detection?.positiveSignals?.length > 0 && (
          <div className="result-section positive-section">
            <div className="result-section-header">
              <div>
                <p className="result-label">POSITIVE SIGNALS</p>
                <h3>Good Indicators</h3>
              </div>
            </div>

            <div className="positive-list">
              {analysis.detection.positiveSignals.map(
                (signal, index) => (
                  <div className="positive-item" key={index}>
                    <span className="positive-icon">✓</span>
                    <p>{signal}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div
          className={`recommendation ${getRiskClass(
            analysis.riskLevel
          )}`}
        >
          <p className="result-label">RECOMMENDATION</p>

          <h3>What should you do?</h3>

          <p>{analysis.recommendation}</p>
        </div>

        <div className="job-info">
          <div>
            <span>Job Title</span>
            <strong>{analysis.jobTitle}</strong>
          </div>

          <div>
            <span>Company</span>
            <strong>{analysis.companyName}</strong>
          </div>

          {analysis.salary && (
            <div>
              <span>Salary</span>
              <strong>{analysis.salary}</strong>
            </div>
          )}

          {analysis.location && (
            <div>
              <span>Location</span>
              <strong>{analysis.location}</strong>
            </div>
          )}

          {analysis.companyWebsite && (
            <div>
              <span>Website</span>
              <strong>{analysis.companyWebsite}</strong>
            </div>
          )}

          <div>
            <span>Analyzed On</span>
            <strong>{formatDate(analysis.createdAt)}</strong>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          JOB<span>SHIELD</span>
        </div>

        <div className="nav-links">
          <a href="#analyze">Analyze</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="badge">AI-POWERED JOB SCAM DETECTION</p>

            <h1>
              Protect Yourself From
              <span> Fake Job Offers</span>
            </h1>

            <p className="hero-description">
              JOBSHIELD analyzes job postings and recruitment messages to
              identify potential scams, suspicious patterns, and fraudulent
              recruitment activity.
            </p>

            <a href="#analyze" className="hero-button">
              Analyze a Job
            </a>
          </div>
        </section>

        <section id="analyze" className="analyze-section">
          <div className="section-heading">
            <p className="section-label">JOB ANALYZER</p>

            <h2>Check a Job Posting</h2>

            <p>
              Enter the job details below and let JOBSHIELD analyze the
              opportunity for potential fraud.
            </p>
          </div>

          <div className="analyzer-card">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
            />

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
            />

            <input
              type="text"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="Company Website (optional)"
            />

            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salary (optional)"
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (optional)"
            />

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
            />

            {error && <div className="error">{error}</div>}

            <button onClick={analyzeJob} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Job"}
            </button>
          </div>

          {result && renderAnalysisDetails(result)}
        </section>

        <section id="history" className="history-section">
          <div className="section-heading">
            <p className="section-label">YOUR ANALYSES</p>

            <h2>Analysis History</h2>

            <p>
              Review previous job analyses and keep track of suspicious
              opportunities.
            </p>
          </div>

          {historyLoading ? (
            <div className="history-state">
              <div className="spinner"></div>
              <p>Loading your analysis history...</p>
            </div>
          ) : historyError ? (
            <div className="history-error">
              <p>{historyError}</p>

              <button onClick={fetchHistory}>Try Again</button>
            </div>
          ) : history.length === 0 ? (
            <div className="empty-history">
              <div className="empty-history-icon">+</div>

              <h3>No analyses yet</h3>

              <p>
                Analyze your first job posting to see it appear here.
              </p>

              <a href="#analyze">Analyze a Job</a>
            </div>
          ) : (
            <div className="history-grid">
              {history.map((analysis) => (
                <div className="history-card" key={analysis._id}>
                  <div className="history-card-top">
                    <div>
                      <h3>{analysis.jobTitle}</h3>

                      <p>{analysis.companyName}</p>
                    </div>

                    <span
                      className={`history-risk ${getRiskClass(
                        analysis.riskLevel
                      )}`}
                    >
                      {analysis.riskLevel}
                    </span>
                  </div>

                  <div className="history-stats">
                    <div>
                      <span>Scam Score</span>
                      <strong>{analysis.scamScore}/100</strong>
                    </div>

                    <div>
                      <span>Confidence</span>
                      <strong>{analysis.confidenceScore}%</strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{formatDate(analysis.createdAt)}</strong>
                    </div>
                  </div>

                  <div className="history-card-footer">
                    <button
                      className="view-button"
                      onClick={() => viewHistoryDetails(analysis._id)}
                    >
                      View Details
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteAnalysis(analysis._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedHistory && renderAnalysisDetails(selectedHistory)}
        </section>

        <section id="about" className="about-section">
          <p className="section-label">WHY JOBSHIELD?</p>

          <h2>Stay Safe During Your Job Search</h2>

          <div className="features">
            <div className="feature-card">
              <h3>Fraud Detection</h3>

              <p>
                Detect suspicious patterns commonly associated with
                fraudulent job postings.
              </p>
            </div>

            <div className="feature-card">
              <h3>Risk Analysis</h3>

              <p>
                Understand the potential risk level of a job opportunity
                before sharing your personal information.
              </p>
            </div>

            <div className="feature-card">
              <h3>Recruitment Safety</h3>

              <p>
                Identify warning signs such as suspicious payment
                requests, unrealistic offers, and questionable recruitment
                practices.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>JOBSHIELD — AI-Powered Fake Job Detection</p>
      </footer>
    </div>
  );
}

export default App;