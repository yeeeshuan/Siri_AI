"use client"

import styles from "../page.module.css"
import Image from 'next/image'
import Node from "./node";
import { useState, useRef, useEffect } from "react";

require('dotenv').config();

async function generate(setLoading, setNodes, prompt, setLeft, setMiddle, setRight) {

    console.log(prompt); 

    console.log("generate"); 

    setLoading(true); // Set loading state to true

    try {
        
      //Prompting
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({input: prompt})
        });
                       
        const res = await response.json();

        console.log(res); 

        setNodes(res);

        if (res.l){
            console.log(res.l)
            setLeft(res.l)
        }

        if (res.m){
            console.log(res.m)
            setMiddle(res.m)
        }

        if (res.r){
            console.log(res.r)
            setRight(res.r)
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log("done");
        setLoading(false); // Set loading state to false once processing is done
    }
}

async function lebron(nodes, setNodes, setLeft, setMiddle, setRight){
    const temp = await JSON.parse(nodes); 
    console.log("TEMP", temp); 
    setNodes(temp); 
    setLeft(temp.l)
    setMiddle(temp.m)
    setRight(temp.r)
}

function GenAI(setLoading, loading) {

    const [left, setLeft] = useState(null); 
    const [middle, setMiddle] = useState(null); 
    const [right, setRight] = useState(null); 

    const [event, setEvents] = useState(
    `
    {
        "l":
        {
            "Alarm":
            {
                "title": "Interview Day Alarm", 
                "description": "Set alarms for the day of the interview",
                "events": [
                    { "title": "Wake Up", "des": "8:00 AM"},
                    { "title": "Leave for Interview", "des": "10:00 AM"},
                    { "title": "Reminder to Breathe", "des": "10:15 AM"},
                    { "title": "Final Review", "des": "10:30 AM"},
                    { "title": "Travel Time", "des": "10:45 AM"},
                    { "title": "Interview Start", "des": "11:00 AM"},
                    { "title": "Follow-Up Reminder", "des": "Set for the next day after interview."}
                ]
            }
        },
        "m":
        {
            "Music":
            {
                "title": "Motivation Playlist", 
                "description": "This is a playlist to energize before the interview",
                "events": [
                    { "title": "Survivor", "des": "Destiny's Child"},
                    { "title": "Eye of the Tiger", "des": "Survivor"},
                    { "title": "Stronger", "des": "Kanye West"},
                    { "title": "Can't Stop the Feeling!", "des": "Justin Timberlake"},
                    { "title": "Happy", "des": "Pharrell Williams"},
                    { "title": "Fighter", "des": "Christina Aguilera"},
                    { "title": "On Top of the World", "des": "Imagine Dragons"}
                ]
            }
        },
        "r":
        {
            "Music":
            {
                "title": "Motivation Playlist", 
                "description": "This is a playlist to energize before the interview",
                "events": [
                    { "title": "Survivor", "des": "Destiny's Child"},
                    { "title": "Eye of the Tiger", "des": "Survivor"},
                    { "title": "Stronger", "des": "Kanye West"},
                    { "title": "Can't Stop the Feeling!", "des": "Justin Timberlake"},
                    { "title": "Happy", "des": "Pharrell Williams"},
                    { "title": "Fighter", "des": "Christina Aguilera"},
                    { "title": "On Top of the World", "des": "Imagine Dragons"}
                ]
            }, 
            "Alarm":
            {
                "title": "Interview Day Alarm", 
                "description": "Set alarms for the day of the interview",
                "events": [
                    { "title": "Wake Up", "des": "8:00 AM"},
                    { "title": "Leave for Interview", "des": "10:00 AM"},
                    { "title": "Reminder to Breathe", "des": "10:15 AM"},
                    { "title": "Final Review", "des": "10:30 AM"},
                    { "title": "Travel Time", "des": "10:45 AM"},
                    { "title": "Interview Start", "des": "11:00 AM"},
                    { "title": "Follow-Up Reminder", "des": "Set for the next day after interview."}
                ]
            }
        }
    } 
    `
    )

    const [nodes, setNodes] = useState(null)

    // useEffect(() => {
    //     if (!nodes) {
    //         lebron(event, setNodes, setLeft, setMiddle, setRight);
    //     }
    // }, [nodes]);

    const [prompt, setPrompt] = useState(""); 

    const handleInputChange = (event) => {
        console.log("PROMPT", prompt)
        setPrompt(event.target.value); // Update prompt state as user types
    };
  
    return (
        <>
            <div style={{display: "flex", justifyContent: "end"}}>
                <div className={styles.genAI}>
                    <h2>What can I help you with?</h2>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className={styles.form}>
                            <textarea className={styles.prompt} 
                            id="prompt"
                            onChange={handleInputChange}/>
                            <div style={{display:"flex", alignItems:"center", height: "26px"}}>
                                <button 
                                    className={`${styles.upload} ${prompt.length ? styles.uploadActive : ''}`}
                                    onClick={() => generate(setLoading, setNodes, prompt, setLeft, setMiddle, setRight)}> 
                                </button>
                            </div>
                        </div>   
                    </div>
                    {loading && (
                        <p style={{color:"white", marginTop:"20px"}}>Loading ...</p>
                    )}
                </div>     
            </div>
        {nodes?.m ?(
        <>
            <div style={{display:"flex", justifyContent:"end"}}>
                <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <div style={{width:"32.5%"}}>
                        {nodes.l && left && Object.entries(left).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(left).length}
                            />
                        ))}
                    </div>
                    <div style={{width:"32.5%"}}>
                        {nodes.m && middle && Object.entries(middle).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(middle).length}
                            />
                        ))}
                    </div>
                    <div style={{width:"32.5%"}}>
                        {nodes.r && right && Object.entries(right).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(right).length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    ):(
        <>
            <div style={{display:"flex", justifyContent:"end"}}>
            <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                <div style={{width:"49.5%"}}>
                    {nodes && left && Object.entries(left).map(([key, category]) => (
                        < Node
                            pos = "l"
                            app = {key}
                            category = {category}
                            len = {Object.keys(nodes.l).length}
                            nodes =  {nodes}
                            setNodes = {setNodes}
                        />
                    ))}
                </div>
                <div style={{width:"49.5%"}}>
                    {nodes && right && Object.entries(right).map(([key, category]) => (
                        < Node
                            pos = "r"
                            app = {key}
                            category = {category}
                            len = {Object.keys(nodes.r).length}
                            nodes =  {nodes}
                            setNodes = {setNodes}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )}
    </>
)}

export default GenAI;
