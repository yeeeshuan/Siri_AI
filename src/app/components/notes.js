"use client"
import styles from "./notes.module.css"
import Input from "./input";
import { useState } from "react";

function Notes({app, len, info, setInfo, prompt, setPrompt, generate}) {
    const height = `${80 / len}vh`;
    const lHeight = len == 2 ? "20vh" : "60vh"; // or any default value
    const [loading, setLoading] = useState(false)
    return(
        <div 
            className={styles.notes}
            height = {height}
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
            <div 
            contentEditable
            suppressContentEditableWarning
            style={{margin:"8px 16px", height:lHeight, overflowY:"auto"}} className={styles.events}>
                {info.events.map((event, index) => (
                    <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                        <h3>{event.title}</h3>
                        {/* Handle different structures for `event` */}
                        {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
                        <hr className={styles.notesBorder}/>
                    </div>
                ))}
            </div>
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
    )
}

export default Notes;
