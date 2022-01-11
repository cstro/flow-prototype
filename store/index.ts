import create, { GetState, SetState } from 'zustand'
import { devtools, persist, StoreApiWithPersist } from 'zustand/middleware'
import { SessionType } from '../types'

import { TimerStatus, Time } from '../types/timer'

type StoreState = {
  status: TimerStatus
  timeLeft: Time
  type: SessionType
  setStatus: (status: TimerStatus) => void
  setTimeLeft: (timeLeft: Time) => void
  setType: (type: SessionType) => void
}

const useSessionStore = create<
  StoreState,
  SetState<StoreState>,
  GetState<StoreState>,
  StoreApiWithPersist<StoreState>
>(
  persist(
    devtools((set) => ({
      status: TimerStatus.off,
      timeLeft: { minutes: 25, seconds: 0 },
      type: SessionType.focus,
      setStatus(status: TimerStatus) {
        set({ status })
      },
      setTimeLeft(timeLeft: Time) {
        set({ timeLeft })
      },
      setType(type: SessionType) {
        set({ type })
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
