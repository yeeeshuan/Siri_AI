"use client"
import styles from "./timer.module.css"
import Input from "./input";
import Toggle from "./toggle";
import { useState } from "react";

function TimerPage({app, info}) {
    return(
        <div 
            className={`${styles.notes} ${styles.page}`}
            height
            key={app}>
            <div className={styles.top}>
                <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
            </div>
            <div 
                style={{margin:"8px 16px"}}>
                <h1>{app}: {info.title}</h1>
                <p style={{color:"lightgray"}}>{info.description}</p>
            </div>
            <div 
            style={{margin:"8px 16px", overflowY:"auto"}} className={styles.events}>
                {info.events.map((event, index) => (
                    <div>
                        <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div>
                                    <h3 className={styles.time}>{event.des}</h3>
                                    {event.des && <p className={styles.des}>{event.title}</p>}
                                </div>
                                <Toggle/>
                            </div>
                            <hr className={styles.notesBorder}/>
                        </div>
                    </div>
                ))}
            </div>
            {/* <Input
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
            )} */}
        </div>
    )
}

export default TimerPage;
