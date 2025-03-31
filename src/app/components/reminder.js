"use client"
import styles from "./reminder.module.css"
import Input from "./input";
import { useState } from "react";

function onTitleChange(main, info, setInfo, id, newTitle) {
    console.log(newTitle)
    if (main){
        info.title = newTitle;
    }else{
        info.events[id].title = newTitle;
    }
    setInfo(info); 
}

function onDesChange(main, info, setInfo, id, newDes) {
    console.log(newDes)
    if (main){
        info.description = newDes; 
    }else{
        info.events[id].des = newDes;
    }
    setInfo(info); 
}

function Reminder({app, len, info, setInfo, prompt, setPrompt, generate}) {
    const [loading, setLoading] = useState(false)
    return(
        <div className={styles.notesWrapper}>
            <div className={`${styles.notes} ${styles.up}`}
                height
                key={app}>
                <div className={styles.top}>
                    <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
                </div>
                <div style={{margin:"8px 16px"}}>
                    <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onTitleChange(true, info, setInfo, -1, e.target.innerText)}
                        className={styles.title}>
                        {app}: {info.title}
                    </h1>
                    <p 
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onDesChange(true, info, setInfo, -1, e.target.innerText)} 
                        style={{color:"lightgray"}}>
                        {info.description}
                    </p>
                </div>
                <div style={{margin:"16px 16px 8px 16px"}}>
                    <p className={styles.num}>{info.events.length} uncompleted</p>
                </div>
            </div>
            <div style={{height: len == 1? "70vh" : "25vh"}} className={`${styles.notes} ${styles.middle}`}>
                <div style={{margin:"8px 16px", overflowY:"auto"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px", display:"flex"}} key={index} className={styles.event}>
                            <div>
                                <button className={styles.checkBtn}/>
                            </div>
                            <div 
                            style={{width:"100%"}}>
                                <h3 
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => onTitleChange(false, info, setInfo, index, e.target.innerText)}
                                >
                                    {event.title}
                                </h3>

                                {event.des && <p 
                                style={{color:"lightgray"}}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => onDesChange(false, info, setInfo, index, e.target.innerText)}
                                >
                                    {event.des}
                                </p>}
                                <hr className={styles.notesBorder}/>
                            </div>
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

export default Reminder;
