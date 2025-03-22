import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState(null);

  const handleUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    const response = await axios.post("/api/analyze", formData);
    setResults(response.data);
  };

  return (
    <div>
      <h1>Upload Your Resume</h1>
      <input type="file" onChange={handleUpload} />
      <h2>Paste Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Analyze</button>
      {results && (
        <div>
          <h3>Resume Score: {results.score}</h3>
          <p>Missing Keywords: {results.missingKeywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
