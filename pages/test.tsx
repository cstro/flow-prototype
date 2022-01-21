import { Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { createSession, fetchSessions } from '../services/firebase/firestore'
import { SessionType } from '../types'

const Test: NextPage = () => {
  return (
    <div>
      <Button
        onClick={() => {
          createSession({
            createdAt: new Date(),
            duration: 25,
            type: SessionType.focus,
          })
        }}
      >
        Add a session
      </Button>

      <Button
        onClick={async () => {
          const sessions = await fetchSessions()
          console.log(sessions, sessions[0].data())
        }}
      >
        Get user sessions
      </Button>
    </div>
  )
}

export default Test
