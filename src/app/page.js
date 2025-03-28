"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import GenAI from "./components/genAi";

require('dotenv').config();

export default function Home() {
  const [loading, setLoading] = useState(false); 

  return (
    <main className={styles.main}>
      {GenAI(setLoading, loading)}
    </main>
  );
}
