"use client"
import styles from "./music.module.css"
import Input from "./input";
import { useState } from "react";

function Music({app, len, info, setInfo, prompt, setPrompt, generate, selected, listApps, setClicked}) {

    const [loading, setLoading] = useState(false)
    return(
        <div className={styles.notesWrapper}
        onClick = {() => setClicked(app)}
        style={{height: 
                (len == 2)? (selected === "Music") ? "70%" : 
                    (!(selected === "All") && !(selected === "Music") && (selected in listApps)) ? "5%" : 
                        "37%" 
                : "100%" }}>
            <div className={`${styles.notes} ${styles.up}`}
                key={app}
                style = {{borderColor: (selected === "Music") ? "rgb(50,173,230)" : ""}}>
                <div className={styles.top}/>
                <div 
                    style={{margin:"0 16px 8px 16px", display:"flex"}}>
                    <div style={{marginRight:"8px"}}>
                    <img height="36px" width="36px" src="/spotify.svg"/>
                    </div>
                    <div>
                        <h1>{info.title}</h1>
                        <p style={{color:"lightgray"}}>{info.description}</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.notes} ${styles.middle}`}
            style = {{borderColor: (selected === "Music") ? "rgb(50,173,230)" : ""}}>
                <div className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                            <div style={{marginRight:"16px"}}>
                                <h3 className={styles.num}>{index}</h3>
                            </div>
                            <div style={{width:"100%"}}>
                                <h3>{event.title}</h3>
                                {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
                                <hr className={styles.notesBorder}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.notes} ${styles.down}`}
            style = {{borderColor: (selected === "Music") ? "rgb(50,173,230)" : ""}}>
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

export default Music;
