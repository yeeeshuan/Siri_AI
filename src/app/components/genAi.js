// This is the genAI component. It calls the openAI API to generate nodes into a left, middle and right column. 
// It also parses information into the correct apps such that they can be called in the sidebar. 

"use client"

import styles from "../page.module.css"
import Image from 'next/image'
import Node from "./node";
import { useState, useRef, useEffect } from "react";
import { Akatab } from "next/font/google";

require('dotenv').config();


// Generate function for calling the openAI API to parse information into columns and the correct apps. 
async function generate(setLoading, setNodes, prompt, setLeft, setMiddle, setRight, setApps) {

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

        const allApps = [
            "All",
            ...Object.keys(res.l || {}),
            ...Object.keys(res.m || {}),
            ...Object.keys(res.r || {})
          ];
    
        console.log("ALL APPS", allApps)
        setApps(allApps)
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log("done");
        setLoading(false); // Set loading state to false once processing is done
    }
}

// Testing function with sample nodes
// Named after my GOAT, lebron
async function lebron(nodes, setNodes, setLeft, setMiddle, setRight, setApps){
    const temp = await JSON.parse(nodes); 

    console.log("LEBRON", temp); 

    setNodes(temp); 
    setLeft(temp.l)
    setMiddle(temp.m)
    setRight(temp.r)

    const allApps = [
        "All",
        ...Object.keys(temp.l || {}),
        ...Object.keys(temp.m || {}),
        ...Object.keys(temp.r || {})
      ];

    setApps(allApps)
}

function GenAI({
        setLoading, loading, 
        setNodes, nodes, 
        setApps, 
        setLeft, left, 
        setMiddle, middle, 
        setRight, right, 
        selected, setClick
    }) {

    const [prompt, setPrompt] = useState(""); 

    // event is a temporary const for a sample json to test 
    // event is what nodes will look like after generation is called. 
    const [event, setEvents] = useState(
    `
    {
        "l":
        {
            "Notes":
            {
                "title": "Fire Starter",
                "description": "Detailed steps to start a fire",
                "events": [
                    { "title": "Gather materials", "des": "Dry leaves, twigs, and small sticks"},
                    { "title": "Prepare the area", "des": "Clear away any debris or flammable items"},
                    { "title": "Build a fire pit", "des": "Create a ring of rocks to contain the fire"},
                    { "title": "Arrange materials", "des": "Stack smaller materials first, then larger ones"},
                    { "title": "Light the fire", "des": "Use matches or a lighter to ignite the materials"}
                ]
            }
        },
        "m":
        {
            "Reminders": 
            {
                "title": "Fire Prep List",
                "description": "List of reminders for starting a fire",
                "events": [
                    { "title": "Check wind direction", "des": "Ensure it blows away from structures"},
                    { "title": "Have water nearby", "des": "For safety in case of emergencies"},
                    { "title": "Notify someone", "des": "Inform someone of your location and activity"},
                    { "title": "Monitor the fire", "des": "Keep an eye on it until completely extinguished"},
                    { "title": "Clean up", "des": "Dispose of ashes properly"}
                ]
            }
        },
        "r":
        {
            "Music":
            {
                "title": "Fire Starter Beats",
                "description": "Playlist to set the mood for starting a fire",
                "events": [
                    { "title": "Ring of Fire", "des": "Johnny Cash"},
                    { "title": "Light My Fire", "des": "The Doors"},
                    { "title": "Burning Love", "des": "Elvis Presley"},
                    { "title": "We Didn't Start the Fire", "des": "Billy Joel"},
                    { "title": "Fire", "des": "Jimi Hendrix"}
                ]
            }, 
            "Alarm":
            {
                "title": "Fire Time Alarms",
                "description": "Timers for each step of starting a fire",
                "events": [
                    { "title": "Gather materials", "des": "10:00 AM"},
                    { "title": "Prepare the area", "des": "10:30 AM"},
                    { "title": "Build a fire pit", "des": "11:00 AM"},
                    { "title": "Arrange materials", "des": "11:30 AM"},
                    { "title": "Light the fire", "des": "12:00 PM"}
                ]
            }
        }
    }
    `
    )

    const [ai, setAi] = useState(false); 

    useEffect(() => {
        if (!nodes) {
            lebron(event, setNodes, setLeft, setMiddle, setRight, setApps);
        }
    }, [nodes]);

    const handleInputChange = (event) => {
        console.log("PROMPT", prompt)
        setPrompt(event.target.value); // Update prompt state as user types
    };
  
    return (
        <>
        {/* Prompt Box */}
        <div style={{display: "flex", justifyContent: "end", padding:"1vh 1vh", overflowY:"hidden"}}>
            {nodes && (
                    <div className={`${styles.genAI} ${styles.loaded}`}
                    onClick = {() => setAi(true)}
                    >
                        <div style={{display:"flex", justifyContent:"center", height: "26px"}}>
                            <img src="/apple.svg"/>
                        </div>
                    </div>   
            )}
            {(ai || !nodes) && (
                <div className={styles.genAI}>
                    <div style={{display:"flex", justifyContent:"end", margin:"0.5rem 0.5rem"}}>
                        <button onClick = {() => setAi(false)} 
                        className={styles.editBtn}>
                            <img height="16px" src ="/delete.svg"/>
                        </button>
                    </div>
                    <div className={styles.form}>
                        <textarea 
                        className={`${styles.prompt} ${loading ? styles.loadingText : ""}`}
                        disabled={loading}
                        placeholder="What can I help you with?"
                        id="prompt"
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); 
                                generate(
                                  setLoading, 
                                  setNodes, 
                                  prompt, 
                                  setLeft, setMiddle, setRight, 
                                  setApps
                                );
                            }
                        }}/>
                        <div style={{display:"flex", alignItems:"center", height: "26px"}}>
                            <button 
                                className={`${styles.upload} ${(prompt.length || loading) ? styles.uploadActive : ''}`}
                                onClick={() => generate(
                                    setLoading, 
                                    setNodes, 
                                    prompt, 
                                    setLeft, setMiddle, setRight, 
                                    setApps
                            )}> 
                            <img width="80%" src="/upload.svg"/>
                            </button>
                        </div> 
                    </div>
                </div>  
            )}
        </div>

        <div style={{padding:"0 2vw"}}>
            <div style={{display: "flex", justifyContent: "end"}}>
               
            </div>
        {nodes?.m ?(
            <div 
            style={{display: "flex", justifyContent:"end"}}>
                <div style={{ width:"100%", display: "flex", justifyContent:"space-between"}}>
                    <div className={`${styles.colThird} ${(selected in left) ? styles.expanded : ''}`}
                    style = {{
                        width : ((selected != "All" && !(selected in left)) ? "12%" : ' ')
                    }}
                    >
                        {nodes.l && left && Object.entries(left).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(left).length}
                                selected = {selected}
                                left = {left}
                                setClicked = {setClick}
                            />
                        ))}
                    </div>
                    <div 
                    className={`${styles.colThird} ${(selected in middle) ? styles.expanded : ''}`}
                    style = {{
                        width : ((selected != "All" && !(selected in middle)) ? "12%" : ' '),
                        margin: "0 4px"
                    }}
                    >
                        {nodes.m && middle && Object.entries(middle).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(middle).length}
                                selected = {selected}
                                listApps = {middle}
                                setClicked = {setClick}
                            />
                        ))}
                    </div>
                    <div className={`${styles.colThird} ${(selected in right) ? styles.expanded : ''}`}
                    style = {{
                        width : ((selected != "All" && !(selected in right)) ? "12%" : ' ')
                    }}
                    >
                        {nodes.r && right && Object.entries(right).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(right).length}
                                selected = {selected}
                                listApps = {right}
                                setClicked = {setClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
    ):(
        <>
            <div style={{display:"flex", justifyContent:"end"}}>
            <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                <div style={{width:"49.5%"}}>
                    {nodes && left && Object.entries(left).map(([key, category]) => (
                        < Node
                            app = {key}
                            category = {category}
                            len = {Object.keys(nodes.l).length}
                        />
                    ))}
                </div>
                <div style={{width:"49.5%"}}>
                    {nodes && right && Object.entries(right).map(([key, category]) => (
                        < Node
                            app = {key}
                            category = {category}
                            len = {Object.keys(nodes.r).length}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )}
    </div>
    </>
)}

export default GenAI;
