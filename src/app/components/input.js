"use client"
import styles from "../page.module.css"
import { useState } from "react";

function Input({generate, info, setInfo, prompt, setPrompt, setLoading, app}) {

    console.log("PROMPT", prompt)

    const handleKeyDown = (event) => {
        console.log(event.key); 
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && prompt.length != 0) {
            console.log("ENTER PRESSED"); 
            generate(setEvents, setLoading, setNodes, prompt); 
        }
    };

    const handleInputChange = (event) => {
        setPrompt(event.target.value); // Update prompt state as user types
    };

    return(
        <div className={styles.inputContainer}>
        <div className={styles.rForm}>
            <textarea className={styles.prompt} 
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            // onClick={generate}
            id="prompt"
            placeholder="Describe your change"/>
             <button 
                onClick={()=>generate(setLoading, info, setInfo, prompt, app)}
                className={`${styles.upload} ${prompt.length ? styles.uploadActive : ''}`}> 
                <img height="16px" width="19px" src="/regen.svg"/>
            </button>
        </div>
        </div>
    )
}

export default Input;
