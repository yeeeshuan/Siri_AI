"use client"
import styles from "./notes.module.css"
import Input from "./input";
import { useState } from "react";

function Notes({app, len, info, setInfo, prompt, setPrompt, generate}) {
    const [loading, setLoading] = useState(false)

    return(
        <div className={styles.notesWrapper}>
            <div className={`${styles.notes} ${styles.up}`}
                key={app}>
                <div className={styles.top}>
                    <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
                </div>
                <hr className={styles.topBorder}/>
                <div 
                    contentEditable
                    suppressContentEditableWarning
                    style={{margin:"8px 16px"}}>
                    <h1>{app}: {info.title}</h1>
                    <p style={{color:"lightgray"}}>{info.description}</p>
                </div>
            </div>
            <div style={{height: len == 1? "70.5vh" : "25vh"}} className={`${styles.notes} ${styles.middle}`}>
                <div 
                contentEditable
                suppressContentEditableWarning
                style={{margin:"8px 16px", overflowY:"auto"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                            <h3>{event.title}</h3>
                            {/* Handle different structures for `event` */}
                            {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
                            <hr className={styles.notesBorder}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.notes} ${styles.down}`}>
                <Input
                    generate = {generate}
                    info = {info}
                    setInfo = {setInfo}
                    prompt =  {prompt}
                    setPrompt = {setPrompt}
                    setLoading = {setLoading}
                    app = {app}
                />
                {loading && (
                    <p style={{marginLeft: "16px"}}>Loading ...</p>
                )}
            </div>
        </div>
    )
}

export default Notes;
