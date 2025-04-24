"use client"
import styles from "./reminder.module.css"
import Input from "./input";
import { useState } from "react";

function Safari({app, len, info, setInfo, prompt, setPrompt, generate, selected, listApps, setClicked}) {
    const [loading, setLoading] = useState(false)
    return(
        <div className={styles.notesWrapper}
        onClick = {() => setClicked(app)}
        style={{height: 
                    (len == 2)? (selected === "Safari") ? "73%" : 
                    (!(selected === "All") && !(selected === "Safari") && (selected in listApps)) ? "5%" : 
                        "39%" 
                : "100%" }}>
            <div className={`${styles.notes} ${styles.up}`}
            style = {{borderColor: (selected === "Safari") ? "rgb(50,173,230)" : ""}}
                height
                key={app}>
                <div className={styles.top}/>
                <div 
                style={{margin:"0 16px 8px 16px"}}>
                    <h1>
                        {info.title}
                    </h1>
                    <p 
                        style={{color:"lightgray"}}>
                        {info.description}
                    </p>
                </div>
            </div>
            <div 
            className={`${styles.notes} ${styles.middle}`}
            style = {{borderColor: (selected === "Safari") ? "rgb(50,173,230)" : ""}}>
                <div style={{margin:"0px 16px", overflowY:"auto"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                            <div 
                            style={{width:"100%"}}>
                                <h3 
                                >
                                    {event.title}
                                </h3>
                                <a 
                                    href={event.des}
                                    style={{ color: "lightgray", textDecoration: "none", fontSize:"11px" }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {event.des}
                                </a>
                                <hr className={styles.notesBorder}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.notes} ${styles.down}`}
            style = {{borderColor: (selected === "Safari") ? "rgb(50,173,230)" : ""}}>
                <Input
                    generate = {generate}
                    info = {info}
                    setInfo = {setInfo}
                    prompt =  {prompt}
                    setPrompt = {setPrompt}
                    loading = {loading}
                    setLoading = {setLoading}
                    app = {app}
                />
            </div>
        </div>
    )
}

export default Safari;
