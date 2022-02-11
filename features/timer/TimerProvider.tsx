import { ReactNode } from 'react'
import TimerContext, { Timer } from './timer-context'
import { createSession } from '@/services/firebase/firestore'
import { Time, TimerState } from '@/types/timer'
import { getTimeLeft } from '@/utils/time'
import { addSeconds, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { SessionType } from '@/types/session'

function TimerProvider(props: { children: ReactNode }) {
  const [chime] = useSound('/sounds/chime.mp3')

  const [state, setState] = useState<TimerState>('stopped')
  const [type, setType] = useState<SessionType>('focus')
  const [startTime, setStartTime] = useState<Date>()
  const [originalEndTime, setOriginalEndTime] = useState<Date>()
  const [endTime, setEndTime] = useState<Date>()
  const [duration, setDuration] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<Time>({ minutes: 0, seconds: 0 })
  const [lastPausedAt, setLastPausedAt] = useState<Date>()
  const [notifiedAt, setNotifiedAt] = useState<Date>()
  const [timePaused, setTimePaused] = useState<number>(0)

  const isPaused = state === 'paused'
  const isRunning = state === 'running'
  const isStopped = state === 'stopped'

  const isFocus = type === 'focus'
  const isBreak = type === 'break'

  const start = (durationInSeconds: number, sessionType: SessionType) => {
    const now = new Date()

    const endTime = addSeconds(now, durationInSeconds)
    const calculatedTimeLeft = getTimeLeft(endTime)

    setTimeLeft(calculatedTimeLeft)
    setStartTime(now)
    setEndTime(endTime)
    setOriginalEndTime(endTime)
    setDuration(durationInSeconds)

    setNotifiedAt(undefined)
    setLastPausedAt(undefined)
    setTimePaused(0)

    setType(sessionType)
    setState('running')

    createSession({
      createdAt: now,
      duration: durationInSeconds,
      type: sessionType,
    })
  }

  const pause = () => {
    setState('paused')
    setLastPausedAt(new Date())
  }

  const resume = () => {
    if (lastPausedAt) {
      setTimePaused(
        (prev) => prev + differenceInSeconds(new Date(), lastPausedAt)
      )
    }
    setState('running')
  }

  useEffect(() => {
    if (originalEndTime) {
      setEndTime(addSeconds(originalEndTime, timePaused))
    }
  }, [originalEndTime, timePaused])

  useEffect(() => {
    const isDone = isRunning && timeLeft.minutes <= 0 && timeLeft.seconds <= 0

    const notNotifiedInLastFiveMinutes =
      !notifiedAt || differenceInMinutes(new Date(), notifiedAt) >= 5

    if (isDone && notNotifiedInLastFiveMinutes) {
      chime()
      const message = type === 'focus' ? 'Take a break' : 'Back to work'
      new Notification(message)
      setNotifiedAt(new Date())
    }
  }, [chime, timeLeft, isRunning, notifiedAt, type])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopped || !endTime) {
        return
      }

      if (isPaused) {
        return
      }

      const calculatedTimeLeft = getTimeLeft(endTime)
      setTimeLeft(calculatedTimeLeft)
    }, 300)

    return () => clearInterval(interval)
  }, [isStopped, endTime, isPaused, lastPausedAt, timePaused])

  const value: Timer = {
    duration,
    originalEndTime,
    endTime,
    notifiedAt,
    timePaused,
    timeLeft,
    isPaused,
    isRunning,
    isStopped,
    isFocus,
    isBreak,
    start,
    pause,
    resume,
    state,
    startTime,
    type,
  }

  return (
    <TimerContext.Provider value={value}>
      {props.children}
    </TimerContext.Provider>
  )
}

export default TimerProvider
