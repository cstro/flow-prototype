import { addMinutes, getUnixTime } from 'date-fns'
import { nanoid } from 'nanoid'
import create, { GetState, SetState } from 'zustand'
import { devtools, persist, StoreApiWithPersist } from 'zustand/middleware'

import type { Session, SessionType } from '../types'

type AppState = {
  currentSession: Session | null
  sessions: Record<string, Session>
  startNextSession: (sessionType: SessionType, duration: number) => void
}

const createSession = (session: {
  type: SessionType
  from: number
  to: number
}): Session => ({
  id: nanoid(),
  ...session,
})

const useSessionStore = create<
  AppState,
  SetState<AppState>,
  GetState<AppState>,
  StoreApiWithPersist<AppState>
>(
  persist(
    devtools((set) => ({
      sessions: {},
      currentSession: null,

      startNextSession: (sessionType: SessionType, duration: number) => {
        set((state) => {
          const { currentSession } = state
          const nextFrom = new Date()

          if (currentSession) {
            state.sessions[currentSession.id].completed = true
            state.sessions[currentSession.id].to = getUnixTime(nextFrom)
          }

          const endTime = addMinutes(nextFrom, duration)

          const newSession: Session = createSession({
            type: sessionType,
            from: getUnixTime(nextFrom),
            to: getUnixTime(endTime),
          })

          state.sessions[newSession.id] = newSession
          state.currentSession = newSession
        })
      },
    })),
    {
      name: 'session-storage',
      version: 1,
    }
  )
)

export default useSessionStore
