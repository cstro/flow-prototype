import create, { GetState, SetState } from 'zustand'
import { devtools, persist, StoreApiWithPersist } from 'zustand/middleware'
import { SessionType } from '@/types/session'
import { Time, TimerState } from '@/types/timer'
import { differenceInSeconds } from 'date-fns'

type StoreState = {
  pausedAt: Date | null
  status: TimerState
  timeLeft: Time
  timePaused: number
  type: SessionType
  setStatus: (status: TimerState) => void
  setTimeLeft: (timeLeft: Time) => void
  setType: (type: SessionType) => void
  pauseSession: () => void
  resumeSession: () => void
}

const useSessionStore = create<
  StoreState,
  SetState<StoreState>,
  GetState<StoreState>,
  StoreApiWithPersist<StoreState>
>(
  persist(
    devtools((set, get) => ({
      pausedAt: null,
      status: 'stopped',
      timeLeft: { minutes: 25, seconds: 0 },
      timePaused: 0,
      type: 'focus',
      setStatus(status: TimerState) {
        set({ status })
      },
      setTimeLeft(timeLeft: Time) {
        console.debug('setTimeLeft', timeLeft)
        set({ timeLeft })
      },
      setType(type: SessionType) {
        set({ type })
      },
      pauseSession() {
        set({
          status: 'paused',
          pausedAt: new Date(),
        })
      },
      resumeSession() {
        console.debug('resume')
        let timePaused = 0
        const pausedAt = get().pausedAt

        if (pausedAt != null) {
          timePaused = differenceInSeconds(new Date(), pausedAt)
        }

        console.debug(timePaused)

        set({
          status: 'running',
          timePaused: get().timePaused + timePaused,
          pausedAt: null,
        })
      },
    })),
    {
      name: 'app-storage',
      version: 1,
      partialize: () => ({}),
    }
  )
)

export default useSessionStore
