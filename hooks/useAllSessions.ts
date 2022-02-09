import { useEffect, useState } from 'react'
import { useAuthState } from '@/services/firebase/auth'
import { fetchAllSessions } from '@/services/firebase/firestore'
import { Session } from '@/types/session'

const useAllSessions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState<Session[]>([])
  const [user] = useAuthState()

  useEffect(() => {
    try {
      const fetch = async () => {
        const data = await fetchAllSessions()
        setSessions(data)
        setIsLoading(false)
      }

      fetch()
    } catch (error) {
      // TODO: set error somewhere.
    }
  }, [user])

  return { isLoading, sessions }
}

export default useAllSessions
