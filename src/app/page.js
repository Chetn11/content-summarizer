"use client";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState({});
  const [section, setSection] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState("");
  const [type, setType] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://content-summarizer-backend.vercel.app/generate",
        { prompt }
      );
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://content-summarizer-backend.vercel.app/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(res.data);
      setFileResponse(res.data);
      setLoading(false);
    } catch (error) {
      setFileResponse(`Error: ${error}`);
      setLoading(false);
    }
  };
  // console.log( fileResponse);
  return (
    <div className={styles.container}>
      {type ? (
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
          <div className={styles.type}>
            <button onClick={() => setType(!type)}>Text</button>
            <button onClick={() => setType(!type)}>File</button>
          </div>
        </div>
      ) : (
        <div className={styles.file_upload_area}>
          <h2>File Upload</h2>
          <form  encType="multipart/form-data" onSubmit={handleFileUpload}>
            <label htmlFor="fileInput">Choose a file:</label>
            <input type="file" id="fileInput" name="file" required />
            <button type="submit" disabled={loading} >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <div className={styles.type}>
              <button onClick={() => setType(!type)} disabled={type===true}>Text</button>
              <button onClick={() => setType(!type)} disabled={type===false}>File</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.output_area}>
        <div id={styles.summary} className={styles.area}>
          {section === "summary" && (
            <div>
              <h3>Summary:</h3>
              <p>{type?summary.summary:fileResponse.summary}</p>
            </div>
          )}
          {section === "sentiment" && (
            <div>
              <h3>Sentiments:</h3>
              <h4>{type?summary.sentiment:fileResponse.sentiment}</h4>
            </div>
          )}
          {section === "topics" && (
            <div>
              <h3>Topics:</h3>
              <h4>{type?(summary.topic || summary.topics):(fileResponse.topic || fileResponse.topics)}</h4>
            </div>
          )}
          {section === "keywords" && (
            <div>
              <h5>Keywords:</h5>
              <pre>{type?(JSON.stringify(summary.keywords, null, 2)):(JSON.stringify(fileResponse.keywords, null, 2))}</pre>
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
