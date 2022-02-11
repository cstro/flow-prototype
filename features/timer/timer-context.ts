import { SessionType } from '@/types/session'
import { Time, TimerState } from '@/types/timer'
import noop from '@/utils/noop'
import { createContext } from 'react'

export type Timer = {
  duration: number
  startTime?: Date
  originalEndTime?: Date
  endTime?: Date
  timePaused: number
  timeLeft: Time
  isPaused?: boolean
  isRunning?: boolean
  isStopped?: boolean
  isFocus?: boolean
  isBreak?: boolean
  state: TimerState
  type: SessionType
  notifiedAt?: Date
  start: (durationInSeconds: number, sessionType: SessionType) => void
  pause: () => void
  resume: () => void
}

const timerContext = createContext<Timer>({
  duration: 0,
  state: 'stopped',
  type: 'focus',
  timePaused: 0,
  timeLeft: { minutes: 0, seconds: 0 },
  start: noop,
  pause: noop,
  resume: noop,
})

export default timerContext
