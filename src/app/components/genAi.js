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

// async function lebron(nodes, setNodes){
//     const temp = await JSON.parse(nodes); 
//     setNodes(temp); 
// }

function GenAI(setLoading, loading) {

    const [left, setLeft] = useState(null); 
    const [middle, setMiddle] = useState(null); 
    const [right, setRight] = useState(null); 

    // const [event, setEvents] = useState(
    //    `
    //    {
    //     "l": {
    //         "Notes": {
    //             "title": "Algorithm Notes",
    //             "description": "Detailed notes for algorithm design midterm",
    //             "events": [
    //                 {
    //                     "title": "Study Greedy Algorithms",
    //                     "des": "Review greedy algorithm concepts and examples."
    //                 },
    //                 {
    //                     "title": "Practice Dynamic Programming",
    //                     "des": "Solve dynamic programming problems to reinforce understanding."
    //                 },
    //                 {
    //                     "title": "Review Divide and Conquer",
    //                     "des": "Go over divide and conquer algorithm principles."
    //                 },
    //                 {
    //                     "title": "Learn Graph Algorithms",
    //                     "des": "Study graph algorithms like Dijkstra and Floyd-Warshall."
    //                 },
    //                 {
    //                     "title": "Understand Complexity Analysis",
    //                     "des": "Review big O notation and time complexity analysis."
    //                 },
    //                 {
    //                     "title": "Master Backtracking",
    //                     "des": "Practice backtracking algorithm techniques."
    //                 },
    //                 {
    //                     "title": "Explore Tree Algorithms",
    //                     "des": "Study different tree traversal and manipulation algorithms."
    //                 }
    //             ]
    //         }
    //     },
    //     "m": {
    //         "Reminders": {
    //             "title": "Study Reminders",
    //             "description": "Set reminders for algorithm design midterm",
    //             "events": [
    //                 {
    //                     "title": "Review Greedy Algorithms",
    //                     "des": "Set a reminder to review greedy algorithms."
    //                 },
    //                 {
    //                     "title": "Practice DP Problems",
    //                     "des": "Reminder to solve dynamic programming problems."
    //                 },
    //                 {
    //                     "title": "Divide and Conquer Study",
    //                     "des": "Set a reminder to go over divide and conquer."
    //                 },
    //                 {
    //                     "title": "Graph Algorithms Review",
    //                     "des": "Reminder to study graph algorithms."
    //                 },
    //                 {
    //                     "title": "Complexity Analysis Study",
    //                     "des": "Set a reminder for complexity analysis revision."
    //                 },
    //                 {
    //                     "title": "Backtracking Practice",
    //                     "des": "Reminder to practice backtracking techniques."
    //                 },
    //                 {
    //                     "title": "Tree Algorithms Exploration",
    //                     "des": "Set a reminder to study tree algorithms."
    //                 }
    //             ]
    //         }
    //     },
    //     "r": {
    //         "Music": {
    //             "title": "Study Playlist",
    //             "description": "Music playlist for algorithm design study",
    //             "events": [
    //                 {
    //                     "title": "Focus Music",
    //                     "des": "Instrumental music for concentration."
    //                 },
    //                 {
    //                     "title": "Classical Study Music",
    //                     "des": "Classical music for studying."
    //                 },
    //                 {
    //                     "title": "Brain Boosting Beats",
    //                     "des": "Upbeat music to keep energy levels high."
    //                 },
    //                 {
    //                     "title": "Ambient Sounds",
    //                     "des": "Relaxing background sounds for focus."
    //                 },
    //                 {
    //                     "title": "Epic Film Scores",
    //                     "des": "Inspirational film scores to motivate."
    //                 },
    //                 {
    //                     "title": "Jazz Study Session",
    //                     "des": "Jazz music for a relaxed studying atmosphere."
    //                 },
    //                 {
    //                     "title": "Electronic Study Beats",
    //                     "des": "Electronic music for study sessions."
    //                 }
    //             ]
    //         },
    //         "Timer": {
    //             "title": "Study Timers",
    //             "description": "Set study timers for algorithm design prep",
    //             "events": [
    //                 {
    //                     "title": "Pomodoro Technique",
    //                     "des": "Use 25-5 Pomodoro timer for focused study."
    //                 },
    //                 {
    //                     "title": "Interval Study Timer",
    //                     "des": "Set intervals for study and short breaks."
    //                 },
    //                 {
    //                     "title": "Long Study Sessions",
    //                     "des": "Timer for longer study periods with breaks."
    //                 },
    //                 {
    //                     "title": "Focus Burst Timer",
    //                     "des": "Short intervals of intense focus with breaks."
    //                 },
    //                 {
    //                     "title": "Relaxation Timer",
    //                     "des": "Time for relaxation and stress relief."
    //                 },
    //                 {
    //                     "title": "Endurance Study Timer",
    //                     "des": "Timer for extended study sessions."
    //                 },
    //                 {
    //                     "title": "Quick Study Boost",
    //                     "des": "Short timer for quick study sessions."
    //                 }
    //             ]
    //         }
    //     }
    // }
    // `
    // )

    const [nodes, setNodes] = useState(null)

    // useEffect(() => {
    //     if (!nodes) {
    //         lebron(event, setNodes);
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
                    <h1>What can I help you with?</h1>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className={styles.form}>
                            <textarea className={styles.prompt} 
                            id="prompt"
                            onChange={handleInputChange}/>
                            <div style={{display:"flex", alignItems:"center", height: "26px", paddingRight:"8px"}}>
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
        {nodes?.m && Object.keys(middle).length > 0 ? (
        <>
            <div style={{display:"flex", justifyContent:"end"}}>
                <div style={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <div style={{width:"32.5%"}}>
                        {nodes.l && Object.entries(left).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(left).length}
                            />
                        ))}
                    </div>
                    <div style={{width:"32.5%"}}>
                        {nodes.m && Object.entries(middle).map(([key, category]) => (
                            < Node
                                app = {key}
                                category = {category}
                                len = {Object.keys(middle).length}
                            />
                        ))}
                    </div>
                    <div style={{width:"32.5%"}}>
                        {nodes.r && Object.entries(right).map(([key, category]) => (
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
                    {nodes && Object.entries(nodes.l).map(([key, category]) => (
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
                    {nodes && Object.entries(nodes.r).map(([key, category]) => (
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
