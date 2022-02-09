import type { NextPage } from 'next'
import Head from 'next/head'
import BreakTimer from '@/features/timer/break-timer'
import FocusingTimer from '@/features/timer/focusing-timer'
import InitialStateTimer from '@/features/timer/initial-state-timer'
import useSessionStore from '@/store/useSessionStore'
import { SessionType } from '@/types/session'
import { TimerStatus } from '@/types/timer'

const Home: NextPage = () => {
  const { status, type } = useSessionStore()

  return (
    <div>
      <Head>
        <title>Flow Prototype</title>
      </Head>

      {status === TimerStatus.off && <InitialStateTimer />}

      {status === TimerStatus.tracking && type === SessionType.focus && (
        <FocusingTimer />
      )}

      {status === TimerStatus.tracking && type === SessionType.break && (
        <BreakTimer />
      )}
    </div>
  )
}

export default Home
