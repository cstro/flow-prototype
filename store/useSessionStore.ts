import { addMinutes } from 'date-fns'
import { nanoid } from 'nanoid'
import create from 'zustand'
import { configurePersist } from 'zustand-persist'

import { Session, SessionType } from '../types'

type AppState = {
  currentSession: Session | null
  sessions: Record<string, Session>
  startNextSession: (sessionType: SessionType, duration: number) => void
}

const createSession = (session: {
  type: SessionType
  from: Date
  to: Date
}): Session => ({
  id: nanoid(),
  ...session,
})

const { persist } = configurePersist({
  storage: localStorage,
})

const useSessionStore = create<AppState>(
  persist({ key: 'sessions' }, (set) => ({
    sessions: {},
    currentSession: null,
    startNextSession: (sessionType: SessionType, duration: number) => {
      set((state) => {
        const { currentSession } = state
        const nextFrom = new Date()

        if (currentSession) {
          state.sessions[currentSession.id].completed = true
          state.sessions[currentSession.id].to = nextFrom
        }

        const endTime = addMinutes(nextFrom, duration)

        const newSession: Session = createSession({
          type: sessionType,
          from: nextFrom,
          to: endTime,
        })

        state.sessions[newSession.id] = newSession
        state.currentSession = newSession
      })
    },
  }))
)

export default useSessionStore
