"use client"
import styles from "./reminder.module.css"
import Input from "./input";
import { useState } from "react";

function ReminderPage({app, info}) {
    console.log("REMINDER", info)
    return(
        <div className={`${styles.notes} ${styles.page}`}
            height
            key={app}>
            <div className={styles.top}>
                <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
            </div>
            <div 
            contentEditable
            suppressContentEditableWarning
            style={{margin:"8px 16px"}}>
                <h1 className={styles.title}>{app}: {info.title}</h1>
                <p style={{color:"lightgray"}}>{info.description}</p>
            </div>
            <div style={{margin:"16px 16px 8px 16px"}}>
                <p className={styles.num}>{info.events.length} uncompleted</p>
            </div>
            <div style={{margin:"8px 16px", overflowY:"auto"}} className={styles.events}>
                {info.events.map((event, index) => (
                    <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                        <div>
                            <button className={styles.checkBtn}/>
                        </div>
                        <div 
                        contentEditable
                        suppressContentEditableWarning
                        style={{width:"100%"}}>
                            <h3>{event.title}</h3>
                            {/* Handle different structures for `event` */}
                            {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
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

export default ReminderPage;
