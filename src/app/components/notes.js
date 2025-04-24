"use client"
import styles from "./notes.module.css"
import Input from "./input";
import { useState } from "react";

function onTitleChange(main, info, setInfo, id, newTitle) {
    if (id == Object.entries(info.events).length){
        console.log("penis")
        info.events[id] = {title: newTitle}
    }
    else if (main){
        info.title = newTitle;
    }else{
        info.events[id].title = newTitle;
    }
    setInfo(info); 
}

function onDesChange(main, info, setInfo, id, newDes) {
    console.log(newDes)
    if (id == Object.entries(info.events).length){
        console.log("penis")
        info.events[id] = {des: newDes}
    }
    else if (main){
        info.description = newDes; 
    }else{
        info.events[id].des = newDes;
    }
    setInfo(info); 
}

function Notes({app, len, info, setInfo, prompt, setPrompt, generate, selected, listApps, setClicked}) {
    console.log(selected, listApps); 
    const [loading, setLoading] = useState(false)
    const id = Object.entries(info.events).length;
    return(
        <div 
        className={styles.notesWrapper}
        onClick = {() => setClicked(app)}
        style={{height: 
                    (len == 2)? (selected === "Notes") ? "70%" : 
                    (!(selected === "All") && !(selected === "Notes") && (selected in listApps)) ? "5%" : 
                        "37%" 
                : "100%" }}>
            <div className={`${styles.notes} ${styles.up}`}
                style = {{borderColor: (selected === "Notes") ? "rgb(50,173,230)" : ""}}
                key={app}>
                <div className={styles.top}/>
                <hr className={styles.topBorder}/>
                <div 
                    contentEditable
                    suppressContentEditableWarning
                    style={{margin:"8px 16px"}}>
                    <h1
                        onBlur={(e) => onTitleChange(true, info, setInfo, -1, e.target.innerText)}>
                        {info.title}
                    </h1>
                    <p 
                        onBlur={(e) => onDesChange(true, info, setInfo, -1, e.target.innerText)} 
                        style={{color:"lightgray"}}>
                        {info.description}
                    </p>
                </div>
            </div>
            <div className={`${styles.notes} ${styles.middle}`}
            style = {{borderColor: (selected === "Notes") ? "rgb(50,173,230)" : ""}}>
                <div 
                contentEditable
                suppressContentEditableWarning
                style={{margin:"0px 16px 8px 16px", height:"100%", overflowY:"auto", fontSize: "11px", color:"lightgray", marginTop:"8px"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px"}} 
                        key={index} 
                        className={styles.event}>
                            <h3 
                            style={{color:"white"}}
                            onBlur={(e) => onTitleChange(false, info, setInfo, index, e.target.innerText)}
                            >
                                {event.title}
                            </h3>

                            {event.des && <p 
                            style={{color:"lightgray"}}
                            onBlur={(e) => onDesChange(false, info, setInfo, index, e.target.innerText)}
                            >
                                {event.des}
                            </p>}
                        </div>
                    ))}
                    <div style={{ fontSize: "11px", color:"lightgray", marginTop:"8px"}} 
                        className={styles.event}
                        >
                        <h3 
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onTitleChange(false, info, setInfo, id, e.target.innerText)}
                        >
                        </h3>
                        <p 
                        style={{color:"lightgray"}}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onDesChange(false, info, setInfo, id, e.target.innerText)}
                        >
                        </p>
                    </div>
                </div>
            </div>
            <div className={`${styles.notes} ${styles.down}`}
            style = {{borderColor: (selected === "Notes") ? "rgb(50,173,230)" : ""}}>
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

export default Notes;
