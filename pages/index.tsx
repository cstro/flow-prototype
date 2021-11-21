import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BlobPlayButton from '../components/BlobPlayButton'
import { FiPlay, FiPause, FiRefreshCw, FiSettings } from "react-icons/fi"

// const GrowingBlob = ({ progress }: { progress: number }) => {
//   let diff = 0;

//   if (progress) {
//     // Blob size is 150
//     diff = (Math.max(window.innerWidth, window.innerHeight)) / 150;
//   }

//   return (
//     <svg className={styles.blob} style={{
//       transform: `scale(${1 + (progress * diff)})`,
//     }} viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
//       <path d="M220,380.2198885468876C304.1786342983221,381.84180921589723,401.1853101255388,367.37577894405445,428.98049934790623,287.90188036672276C458.05469700974726,204.7709537265464,399.35973598466177,122.96345845868461,328.04597684993786,71.28747088409858C257.0749706867849,19.85985190647005,163.23882511330444,-7.228984311160296,91.83593109779856,43.59729270898812C18.70985714869002,95.65017016135188,2.478594059167655,196.4135578375118,34.41695712676579,280.29958591634966C62.05507476294402,352.8910304799807,142.3395572723446,378.72355781790435,220,380.2198885468876" fill="#126BFB" />
//     </svg>
//   )
// }

const Home: NextPage = () => {
  const [totalMinutes, setTotalMinutes] = useState(5);
  const [minutesInputValue, setMinutesInputValue] = useState(String(totalMinutes))
  const totalSeconds = totalMinutes * 60

  const [seconds, setSeconds] = useState(totalSeconds)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isActive) {
      if (seconds > 0) {
        timeout = setTimeout(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      } else {
        setIsActive(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(totalMinutes * 60);
  }, [totalMinutes]);

  useEffect(() => {
    const parsed = Number(minutesInputValue)
    if (parsed !== NaN && parsed > 0) {
      setTotalMinutes(parsed);
      setSeconds(parsed * 60);
    }
  }, [minutesInputValue])


  function startClick() {
    if (seconds < 1) {
      setSeconds(totalSeconds);
    }

    setIsActive((value) => !value);
  }

  function refresh() {
    setSeconds(totalMinutes * 60)
    setTotalMinutes(5)
    setMinutesInputValue('5')
    setIsActive(false)
  }


  const progress = (totalSeconds - seconds) / totalSeconds;

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow Prototype</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Link href="/settings" aria-label="View settings" passHref>
        <a className={styles.settingsLink}><FiSettings /></a>
      </Link>

      <main className={styles.main}>
        <BlobPlayButton onClick={startClick} />

        <div className={styles.debug}>
          <button className={styles.refreshButton} onClick={refresh}><FiRefreshCw /></button>

          {!isActive && seconds === totalMinutes * 60 && (
            <>
              <span>Duration:</span>
              <input className={styles.minutesInput} value={minutesInputValue} onChange={(event) => setMinutesInputValue(event.target.value)} />
              <span>mins</span>
            </>
          )}


          {seconds !== totalMinutes * 60 && <>Time Left: {Math.floor(seconds / 60)}m {seconds % 60}s</>}
        </div>

        {/* <button className={styles.button} onClick={startClick}>{isActive ? <FiPause /> : <FiPlay />}</button> */}

      </main>
    </div>
  )
}

export default Home
