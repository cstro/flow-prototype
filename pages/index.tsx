import type { NextPage } from 'next'
import Head from 'next/head'
import UserIcon from '../features/auth/user-icon'
import BreakTimer from '../features/timer/break-timer'
import FocusingTimer from '../features/timer/focusing-timer'
import InitialStateTimer from '../features/timer/initial-state-timer'
import useSessionStore from '../store'
import styles from '../styles/Home.module.css'
import { SessionType } from '../types'
import { TimerStatus } from '../types/timer'

const Home: NextPage = () => {
  const { status, type } = useSessionStore()

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow Prototype</title>
      </Head>

      <main className={styles.main}>
        <UserIcon />
        {status === TimerStatus.off && <InitialStateTimer />}
        {status === TimerStatus.tracking && type === SessionType.focus && (
          <FocusingTimer />
        )}
        {status === TimerStatus.tracking && type === SessionType.break && (
          <BreakTimer />
        )}
      </main>
    </div>
  )
}

export default Home
