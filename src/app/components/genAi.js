// This is the genAI component. It calls the openAI API to generate nodes into a left, middle and right column. 
// It also parses information into the correct apps such that they can be called in the sidebar. 

"use client"

import styles from "../page.module.css"
import Image from 'next/image'
import Node from "./node";
import { useState, useRef, useEffect } from "react";

require('dotenv').config();


// Generate function for calling the openAI API to parse information into columns and the correct apps. 
async function generate(setLoading, setNodes, prompt, setLeft, setMiddle, setRight, setApps, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo) {

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

        parseApps(res.l, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)
        parseApps(res.m, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)
        parseApps(res.r, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)

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

// Function for looking through the JSON and parsing information into the correct apps. 
function parseApps(temp, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo){

    console.log("TEMP", temp); 

    if ("Alarm" in temp){
        setAlarmInfo(temp.Alarm)
    }

    if ("Music" in temp){
        setMusicInfo(temp.Music)
    }

    if ("Reminders" in temp){
        setRemindersInfo(temp.Reminders)
    }

    if ("Notes" in temp){
        setNoteInfo(temp.Notes)
    }
}


// Testing function with sample nodes
// Named after my GOAT, lebron
async function lebron(nodes, setNodes, setLeft, setMiddle, setRight, setApps, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo){
    const temp = await JSON.parse(nodes); 

    console.log("LEBRON", temp); 

    setNodes(temp); 
    setLeft(temp.l)
    setMiddle(temp.m)
    setRight(temp.r)


    parseApps(temp.l, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)
    parseApps(temp.m, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)
    parseApps(temp.r, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo)

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
        setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo
    }) {

    // event is a temporary const for a sample json to test 
    // event is what nodes will look like after generation is called. 
    const [event, setEvents] = useState(
    `
    {
        "l":
        {
            "Notes":
            {
                "title": "Interview Preparation Notes", 
                "description": "This is a compilation of notes for interview prep",
                "events": [
                    { "title": "Research Company", "des": "Gather information about the company's values and culture."},
                    { "title": "Review Common Questions", "des": "Study common interview questions and answers."},
                    { "title": "Prepare Questions to Ask", "des": "List insightful questions to ask the interviewer."},
                    { "title": "Update Resume", "des": "Revise and optimize your resume for the role."},
                    { "title": "Practice Responses", "des": "Rehearse answers to potential interview questions."},
                    { "title": "Dress Code Research", "des": "Find out the appropriate attire for the interview."},
                    { "title": "Plan Journey", "des": "Outline directions and travel time to the interview location."}
                ]
            }
        },
        "m":
        {
            "Reminders": 
            {
                "title": "Interview Preparation Reminders", 
                "description": "This is a list of important reminders for the interview",
                "events": [
                    { "title": "Get Materials Ready", "des": "Prepare documents and items needed for the interview."},
                    { "title": "Practice Mock Interview", "des": "Set up a time for a mock interview session."},
                    { "title": "Sleep Early", "des": "Get a good night's rest before the interview."},
                    { "title": "Set Alarm", "des": "Wake up early to prepare for travelling."},
                    { "title": "Confirm Interview Time", "des": "Double-check the scheduled time for the interview."},
                    { "title": "Double Check Attire", "des": "Ensure interview clothing is clean and ready."},
                    { "title": "Pack a Bag", "des": "Gather everything needed for the day in one bag."}
                ]
            }
        },
        "r":
        {
            "Music":
            {
                "title": "Focus and Motivation Playlist", 
                "description": "This is a playlist to energize and focus before the interview",
                "events": [
                    { "title": "Eye of the Tiger", "des": "Survivor"},
                    { "title": "Lose Yourself", "des": "Eminem"},
                    { "title": "Stronger", "des": "Kanye West"},
                    { "title": "Can't Stop the Feeling", "des": "Justin Timberlake"},
                    { "title": "Formation", "des": "Beyoncé"},
                    { "title": "Hall of Fame", "des": "The Script ft. will.i.am"},
                    { "title": "We Will Rock You", "des": "Queen"}
                ]
            }, 
            "Alarm":
            {
                "title": "Interview Day Alarm", 
                "description": "This alarm is set for 8:00 AM",
                "events": [
                    { "title": "Wake Up", "des": "8:00 AM"},
                    { "title": "Remind to Eat Breakfast", "des": "8:30 AM"},
                    { "title": "Final Review Time", "des": "9:00 AM"},
                    { "title": "Prepare to Leave", "des": "10:00 AM"},
                    { "title": "Travel Time Alert", "des": "10:15 AM"},
                    { "title": "Get to Location", "des": "10:45 AM"},
                    { "title": "Start of Interview", "des": "11:00 AM"}
                ]
            }
        }
    }
    `
    )

    // useEffect(() => {
    //     if (!nodes) {
    //         lebron(event, setNodes, setLeft, setMiddle, setRight, setApps, setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo);
    //     }
    // }, [nodes]);

    const [prompt, setPrompt] = useState(""); 

    const handleInputChange = (event) => {
        console.log("PROMPT", prompt)
        setPrompt(event.target.value); // Update prompt state as user types
    };
  
    return (
        <div style={{padding:"1vw 2vw"}}>
        {!nodes && (
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
                                    onClick={() => generate(
                                        setLoading, 
                                        setNodes, 
                                        prompt, 
                                        setLeft, setMiddle, setRight, 
                                        setApps, 
                                        setAlarmInfo, setMusicInfo, setRemindersInfo, setNoteInfo
                                        )}> 
                                </button>
                            </div>
                        </div>   
                    </div>
                    {loading && (
                        <p style={{color:"white", marginTop:"20px"}}>Loading ...</p>
                    )}
                </div>     
            </div>
        )} 
        {nodes?.m ?(
            <div style={{display:"flex", justifyContent:"end"}}>
                <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <div className={styles.colThird}>
                        {nodes.l && left && Object.entries(left).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(left).length}
                            />
                        ))}
                    </div>
                    <div className={styles.colThird}>
                        {nodes.m && middle && Object.entries(middle).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(middle).length}
                            />
                        ))}
                    </div>
                    <div className={styles.colThird}>
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
)}

export default GenAI;
