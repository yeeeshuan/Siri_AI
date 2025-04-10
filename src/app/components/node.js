"use client"
import { useState, useEffect } from "react";
import styles from "../page.module.css"
import Input from "./input";
import Notes from "./notes";
import Reminder from "./reminder";
import Music from "./music";
import Alarm from "./timer";

// Regeneration function API call 
async function regen(setLoading, info, setInfo, prompt, app) {

    console.log("regenerate"); 

    console.log(app); 
    console.log(info)

    setLoading(true); // Set loading state to true

    try {
        
      //Prompting
        const response = await fetch("/api/regen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({input: prompt, app: app, prev: info})
        });
                       
        let res = await response.json(); 
         
        console.log("NEW NODES", res); 
 
        info.title = res.title; 
        info.description = res.description;
        info.events = res.events; 
    
        setInfo(res);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log("done");
        setLoading(false); // Set loading state to false once processing is done
    }
}

function Node({app, category, len, selected, listApps, setClicked}) {

    const [prompt, setPrompt] = useState(""); 
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState(category)
    
    const height = `${80 / len}vh`;
    const lHeight = len === 2 ? "20vh" : "60vh"; // or any default value

    useEffect(() => {
        setInfo(category);
      }, [category]);

    return(
        app === "Notes"?(
            <Notes
                app = {app}
                len = {len}
                info = {info}
                setInfo = {setInfo} 
                prompt = {prompt}
                setPrompt = {setPrompt}
                generate = {regen}
                selected = {selected}
                listApps = {listApps}
                setClicked = {setClicked}
            />
        ): app === "Reminders"?(
            <Reminder
                app = {app}
                len = {len}
                info = {info}
                setInfo = {setInfo} 
                prompt = {prompt}
                setPrompt = {setPrompt}
                generate = {regen}
                selected = {selected}
                listApps = {listApps}
                setClicked = {setClicked}
            />
        ): app === "Music"?(
            <Music
                app = {app}
                len = {len}
                info = {info}
                setInfo = {setInfo} 
                prompt = {prompt}
                setPrompt = {setPrompt}
                generate = {regen}
                selected = {selected}
                listApps = {listApps}
                setClicked = {setClicked}
            />
        ): app === "Alarm"?(
            <Alarm
                app = {app}
                len = {len}
                info = {info}
                setInfo = {setInfo} 
                prompt = {prompt}
                setPrompt = {setPrompt}
                generate = {regen}
                selected = {selected}
                listApps = {listApps}
                setClicked = {setClicked}
            />
        ):(
            <div 
                contentEditable
                suppressContentEditableWarning
                style={
                {backgroundColor:"rgba(45,45,45,.90)", 
                height:height, 
                padding:"8px", 
                borderRadius:"16px", 
                boxSizing: "border-box", 
                marginTop: "1rem"
                }} 
                key={app} 
                className={styles.category}>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <button className={styles.editBtn}><img height="16px" src ="/delete.svg"/></button>
                </div>
                <div style={{margin:"8px 16px"}}>
                    <h2>{app}: {info.title}</h2>
                    <p>{info.description}</p>
                </div>
                <div style={{margin:"8px 16px", height:lHeight, overflowY:"auto"}} className={styles.events}>
                    {info.events.map((event, index) => (
                        <div style={{marginTop:"8px"}} key={index} className={styles.event}>
                            <h3>{event.title}</h3>
                            {/* Handle different structures for `event` */}
                            {event.des && <p style={{color:"lightgray"}}>{event.des}</p>}
                        </div>
                    ))}
                </div>
                <Input
                    generate = {regen}
                    info = {info}
                    setInfo = {setInfo}
                    prompt =  {prompt}
                    setPrompt = {setPrompt}
                    loading = {loading}
                    setLoading = {setLoading}
                    app = {app}
                />
                {loading && (
                    <p style={{marginLeft:"16px"}}>Loading ...</p>
                )}
            </div>
        ))
}

export default Node;
