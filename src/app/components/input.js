"use client"
import styles from "../page.module.css"
import { useState } from "react";

function Input({generate, info, setInfo, prompt, setPrompt, loading, setLoading, app}) {

    const handleInputChange = (event) => {
        setPrompt(event.target.value); // Update prompt state as user types
    };

    return(
        <div className={styles.inputContainer}>
        <div className={styles.rForm}>
            <textarea 
            className={`${styles.prompt} ${loading ? styles.loadingText : ""}`}
            disabled={loading}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); 
                    generate(setLoading, info, setInfo, prompt, app)
                }
            }}
            onChange={handleInputChange}
            id="prompt"
            placeholder="Describe your change"/>
             <button 
                onClick={()=>generate(setLoading, info, setInfo, prompt, app)}
                className={`${styles.upload} ${prompt.length ? styles.uploadActive : ''}`}> 
                <img width="80%" src="/upload.svg"/>
            </button>
        </div>
        </div>
    )
}

export default Input;
