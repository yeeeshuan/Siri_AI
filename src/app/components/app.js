import { useState } from "react";
import styles from "./app.module.css"; // Replace with your actual styles file

function App({app, path}) {

  return (
    <div className={styles.tooltip}>
        <img width={"125%"} src={path}/>
        <span className={styles.tooltipText}>{app}</span>
    </div>
  );
}

export default App;
