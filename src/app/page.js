"use client";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState({});
  const [section, setSection] = useState("summary");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting the request
    try {
      const res = await axios.post(
        "https://content-summarizer-backend.vercel.app/generate",
        { prompt }
      );
      console.log(res);
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false); // Set loading to false when the request is finished
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_area}>
        <label htmlFor="text" className={styles.title}>
          Enter Your Content:
        </label>
        <textarea
          id="text"
          className={styles.area}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      <div className={styles.output_area}>
        <div id={styles.summary} className={styles.area}>
          {section === "summary" && (
            <div>
              <h3>Summary : </h3>
              <p>{summary.summary}</p>
            </div>
          )}
          {section === "sentiment" && (
            <div>
              <h3>Sentiments : </h3>
              <h4>{summary.sentiment}</h4>
            </div>
          )}
          {section === "topics" && (
            <div>
              <h3>Topics : </h3>
              <h4>{summary.topic || topics}</h4>
            </div>
          )}
          {section === "keywords" && (
            <div>
              <h5>Keywords : </h5>
              <pre>{JSON.stringify(summary.keywords, null, 2)}</pre>
            </div>
          )}
        </div>
        <div className={styles.headings}>
          <button className={styles.inl} onClick={() => setSection("summary")}>
            Summary
          </button>
          <button
            className={styles.inl}
            onClick={() => setSection("sentiment")}
          >
            Sentiments
          </button>
          <button className={styles.inl} onClick={() => setSection("topics")}>
            Topic
          </button>
          <button className={styles.inl} onClick={() => setSection("keywords")}>
            Keywords
          </button>
        </div>
      </div>
    </div>
  );
}
