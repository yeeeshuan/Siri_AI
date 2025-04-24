"use client"
import styles from "./reminder.module.css"
import Input from "./input";
import { useState } from "react";

function Reminder({app, len, info, setInfo, prompt, setPrompt, generate, selected, listApps, setClicked}) {
    console.log("LA", listApps); 
    const [loading, setLoading] = useState(false)
    return(
        <div className={styles.notesWrapper}
        onClick = {() => setClicked(app)}
        style={{height: 
                    (len == 2)? (selected === "Reminders") ? "70%" : 
                    (!(selected === "All") && !(selected === "Reminders") && (selected in listApps)) ? "5%" : 
                        "37%" 
                : "100%" }}>
            <div className={`${styles.notes} ${styles.up}`}
            style = {{borderColor: (selected === "Reminders") ? "rgb(50,173,230)" : ""}}
                height
                key={app}>
                <div className={styles.top}/>
                <div 
                style={{margin:"0 16px 8px 16px"}}>
                    <h1
                        className={styles.title}>
                        {info.title}
                    </h1>
                    <p 
                        style={{color:"lightgray"}}>
                        {info.description}
                    </p>
                </div>
                <div style={{margin:"16px 16px 8px 16px"}}>
                    <p className={styles.num}>{info.events.length} uncompleted</p>
                </div>
            </div>
            <div 
            className={`${styles.notes} ${styles.middle}`}
            style = {{borderColor: (selected === "Reminders") ? "rgb(50,173,230)" : ""}}>
                <div style={{margin:"0px 16px", overflowY:"auto"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                            <div>
                                <button className={styles.checkBtn}/>
                            </div>
                            <div 
                            style={{width:"100%"}}>
                                <h3 
                                >
                                    {event.title}
                                </h3>

                                {event.des && <p 
                                style={{color:"lightgray"}}
                                >
                                    {event.des}
                                </p>}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.notes} ${styles.down}`}
            style = {{borderColor: (selected === "Reminders") ? "rgb(50,173,230)" : ""}}>
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

export default Reminder;
