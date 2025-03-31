// This is the main page. It calls the sidebar and apps (All, Notes, Reminders, Timer, Music) components to render all the different apps in the sidebar. 

"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import GenAI from "./components/genAi";

import NotesPage from "./components/notesPage";
import ReminderPage from "./components/reminderPage";
import MusicPage from "./components/musicPage";
import TimerPage from "./components/timerPage";

import App from "./components/app";

import Notes from "./components/notes";

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

  // Setting the info for each of the apps in the sidebar
  const [remindersInfo, setRemindersInfo] = useState(null); 
  const [alarmInfo, setAlarmInfo] = useState(null); 
  const [musicInfo, setMusicInfo] = useState(null); 
  const [noteInfo, setNoteInfo] = useState(null); 

  // Setting the info for the left, middle, and right for the initial generation
  const [left, setLeft] = useState(null); 
  const [middle, setMiddle] = useState(null); 
  const [right, setRight] = useState(null); 

  // Setting which app is clicked in the sidebar
  function onClick(app){
    if (app === "All"){
        setAll(true)
        setReminders(false)
        setAlarm(false)
        setMusic(false)
        setNotes(false)
    }

    else if (app === "Alarm"){
      setAll(false)
      setReminders(false)
      setAlarm(true)
      setMusic(false)
      setNotes(false)
    }

    else if (app === "Reminders"){
      setAll(false)
      setReminders(true)
      setAlarm(false)
      setMusic(false)
      setNotes(false)
    }

    else if (app === "Music"){
      setAll(false)
      setReminders(false)
      setAlarm(false)
      setMusic(true)
      setNotes(false)
    }

    if (app == "Notes"){
      setAll(false); 
      setReminders(false)
      setAlarm(false)
      setMusic(false)
      setNotes(true); 
    }

  }

  return (
      <main className={styles.main}>
          {all && (
            <GenAI 
            setLoading = {setLoading} 
            loading = {loading}
            setNodes = {setNodes}
            nodes = {nodes}
            setApps = {setApps}
            setLeft={setLeft}
            left={left}
            setMiddle={setMiddle}
            middle={middle}
            setRight={setRight}
            right={right}
            setAlarmInfo = {setAlarmInfo}
            setRemindersInfo = {setRemindersInfo}
            setMusicInfo = {setMusicInfo}
            setNoteInfo={setNoteInfo}
            />
          )}

          {reminders && (
            <>
              <ReminderPage app = {"Reminders"} info={remindersInfo}/>
            </>
          )}

          {alarm && (
            <>
              <TimerPage app = {"Timer"} info={alarmInfo}/>
            </>
          )}

          {music && (   
            <>
              <MusicPage app = {"Music"} info={musicInfo}/>
            </>
 
          )}

          {notes && (
            <>
              <NotesPage app = {"Notes"} info={noteInfo}/>
            </>

          )}

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
                path =  "/spotify.svg"
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
                path =  "/timer.webp"
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
