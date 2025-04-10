"use client"
import styles from "./timer.module.css"
import Input from "./input";
import Toggle from "./toggle";
import { useState } from "react";

function Timer({app, len, info, setInfo, prompt, setPrompt, generate, selected, listApps, setClicked}) {
    const [loading, setLoading] = useState(false)

    return(
        <div 
            className={styles.notesWrapper}
            onClick = {() => setClicked(app)}
            style={{height: 
                (len == 2)? (selected === "Alarm") ? "73%" : 
                    (!(selected === "All") && (selected in listApps)) ? "5%" : 
                        "37%" : 
                "100%"}}>
            <div className={`${styles.notes} ${styles.up}`}
                style = {{borderColor: (selected === "Alarm") ? "rgb(50,173,230)" : ""}}
                key={app}>
                <div className={styles.top}/>
                <div 
                    style={{margin:"8px 16px"}}>
                    <h1>{app}: {info.title}</h1>
                    <p style={{color:"lightgray"}}>{info.description}</p>
                </div>
            </div>
            <div 
            className={`${styles.notes} ${styles.middle}`}
            style = {{borderColor: (selected === "Alarm") ? "rgb(50,173,230)" : ""}}>
                <div className={styles.events}>
                    {info.events.map((event, index) => (
                        <div>
                            <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div>
                                        <h3 className={styles.time} style={{height:"24px", overflowY:"hidden"}}>{event.des}</h3>
                                        {event.des && <p className={styles.des}>{event.title}</p>}
                                    </div>
                                    <Toggle/>
                                </div>
                                <hr className={styles.notesBorder}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className={`${styles.notes} ${styles.down}`}
            style = {{borderColor: (selected === "Alarm") ? "rgb(50,173,230)" : ""}}>
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

export default Timer;
