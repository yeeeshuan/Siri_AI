"use client"
import styles from "./reminder.module.css"
import Input from "./input";
import { useState } from "react";

function Reminder({app, len, info, setInfo, prompt, setPrompt, generate}) {
    const height = `${80 / len}vh`;
    const lHeight = len === 2 ? "20vh" : "55vh"; // or any default value
    const [loading, setLoading] = useState(false)
    return(
        <div className={styles.notes}
            height
            key={app}>
            <div className={styles.top}>
                <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
            </div>
            <div style={{margin:"8px 16px"}}>
                <h2 className={styles.title}>{app}: {info.title}</h2>
                <p>{info.description}</p>
            </div>
            <div style={{margin:"16px 16px 8px 16px"}}>
                <p className={styles.num}>{info.events.length} uncompleted</p>
            </div>
            <div style={{margin:"8px 16px", height:lHeight, overflowY:"auto"}} className={styles.events}>
                {info.events.map((event, index) => (
                    <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                        <div>
                            <button className={styles.checkBtn}/>
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

export default Reminder;
