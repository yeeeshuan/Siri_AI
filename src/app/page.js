// This is the main page. It calls the sidebar and apps (All, Notes, Reminders, Timer, Music) components to render all the different apps in the sidebar. 

"use client";

import styles from "./page.module.css";
import { useState } from "react";
import GenAI from "./components/genAi";

import App from "./components/app";

require('dotenv').config();

export default function Home() {

  // Setting the different apps to populate the Navbar
  const [apps, setApps] = useState([]); 

  // Seting the loading state of the initial prompt box
  const [loading, setLoading] = useState(false); 

  // Seting the nodes for the generated prompt
  const [nodes, setNodes] = useState(null)

  // Setting the toggles on the sidebar
  const [all, setAll] = useState(true); 
  const [reminders, setReminders] = useState(false)
  const [alarm, setAlarm] = useState(false)
  const [music, setMusic] = useState(false)
  const [notes, setNotes] = useState(false)

  // Setting the info for the left, middle, and right for the initial generation
  const [left, setLeft] = useState(null); 
  const [middle, setMiddle] = useState(null); 
  const [right, setRight] = useState(null); 

  const [selected, setSelected] = useState("All")

  function setClick(app){
      setSelected(app)
  }

  // Setting which app is clicked in the sidebar
  function onClick(app){
    if (app === "All"){
      setSelected("All")
    }

    else if (app === "Alarm"){
      setSelected("Alarm")
    }

    else if (app === "Reminders"){
      setSelected("Reminders")
    }

    else if (app === "Music"){
      setSelected("Music")
    }

    if (app == "Notes"){
      setSelected("Notes")
    }
  }

  return (
      <main className={`${loading? styles.loadingStatus : styles.main}`}>
          {/* {all && ( */}
            <GenAI 
            setLoading = {setLoading} loading = {loading}
            setNodes = {setNodes} nodes = {nodes}
            setApps = {setApps}
            setLeft={setLeft} left={left}
            setMiddle={setMiddle} middle={middle}
            setRight={setRight} right={right}
            all = {all}
            reminders = {reminders}
            alarm = {alarm}
            music = {music}
            notes = {notes}
            selected = {selected}
            setClick = {setClick}

            />

        {nodes && (
        <div style={{display:"flex", justifyContent:"center"}}>
          <div className={styles.sidebar}> 
            {apps.map((app) => 
              app === "Music" ? 
              <div
              onClick = {() => onClick(app)}
              >
                <App 
                app = {app}
                path =  "/music.svg"
                /> 
              </div>:
              app === "Reminders" ? 
              <div
              onClick = {() => onClick(app)}
              >
                <App 
                app = {app}
                path =  "/remind.svg"
                /> 
              </div>:
              app === "Alarm" ? 
              <div
              onClick = {() => onClick(app)}
              >
                <App 
                app = {app}
                path =  "/timer.svg"
                /> 
              </div>:
              app === "Notes" ? 
              <div
              onClick = {() => onClick(app)}
              >
                <App
                app = {app}
                path =  "/notes.svg"
                />
              </div>:
              <div
              onClick = {() => onClick(app)}
              >
                <App
                app = {app}
                path =  "/other.svg"
                />
              </div>
              )}
          </div>
        </div>
        )}
      </main>
  );
}
