import { useState } from "react";
import styles from "./toggle.module.css"; // Replace with your actual styles file

function Toggle() {
  const [clicked, setClicked] = useState(false);

  function click() {
    setClicked(prev => !prev);
  }

  return (
    <>
    {clicked ? (
        <label className={`${styles.switch} + ${styles.son}`}>
        <input type="checkbox" checked={clicked} onClick={click} />
        <span className={styles.on}></span>
        </label>
    ):(
        <label className={styles.switch}>
        <input type="checkbox" checked={clicked} onClick={click} />
        <span className={styles.off} ></span>
        </label>
    )}
    </>
  );
}

export default Toggle;
