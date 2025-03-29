"use client"
import styles from "./music.module.css"
import Input from "./input";
import { useState } from "react";

function Music({app, len, info, setInfo, prompt, setPrompt, generate}) {
    const height = `${80 / len}vh`;
    const lHeight = len == 2 ? "22vh" : "63vh"; // or any default value
    const [loading, setLoading] = useState(false)
    return(
        <div 
            className={styles.notes}
            height
            key={app}>
            <div className={styles.top}>
                <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
            </div>
            <div 
                contentEditable
                suppressContentEditableWarning
                style={{margin:"8px 16px", display:"flex"}}>
                <div style={{marginRight:"8px"}}>
                   <img height="36px" width="36px" src="/spotify.svg"/>
                </div>
                <div>
                    <h1>{app}: {info.title}</h1>
                    <p style={{color:"lightgray"}}>{info.description}</p>
                </div>
            </div>
            <div 
            style={{margin:"8px 16px", height:lHeight, overflowY:"auto"}} className={styles.events}>
                {info.events.map((event, index) => (
                    <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                        <div style={{marginRight:"16px"}}>
                            <h3 className={styles.num}>{index}</h3>
                        </div>
                        <div style={{width:"100%"}}>
                            <h3>{event.title}</h3>
                            {/* Handle different structures for `event` */}
                            {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
                            <hr className={styles.notesBorder}/>
                        </div>
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

export default Music;
