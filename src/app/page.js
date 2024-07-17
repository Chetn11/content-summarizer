"use client";
import { useState } from "react";
import styles from "./page.module.css"
export default function Home() {
 
    const [text, setText] = useState('');
  const [summary, setSummary] = useState('');



  return (
    <div className={styles.container}>
      <div className={styles.input_area}>
        <label htmlFor="text" className={styles.inl}>Enter or paste your text:</label>
        <textarea id="text"  className={styles.area}/>
      </div>
      <div className={styles.output_area}>
        <label htmlFor="summary" className={styles.inl}>Summary:</label>
        <textarea id={styles.summary} className={styles.area} readOnly />
      </div>
      <button className={styles.btn}>Summarize</button>
    </div>
  );
  
}
