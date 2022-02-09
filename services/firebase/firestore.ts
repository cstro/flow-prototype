import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
} from 'firebase/firestore'
import auth from './auth'
import { SessionType, Session } from '@/types/session'
import './app'

const db = getFirestore()

/**
 * Creates a new session for the current user.
 *
 * If the user isn't authenticated then no session is created.
 */
export const createSession = async (params: {
  createdAt: Date
  duration: number
  type: SessionType
}) => {
  const userId = auth.currentUser?.uid

  if (!userId) {
    return null
  }

  const { createdAt, ...otherParams } = params

  try {
    const docRef = await addDoc(collection(db, 'sessions'), {
      user: userId,
      createdAt: Timestamp.fromDate(createdAt),
      ...otherParams,
    })

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

/**
 * Fetch the sessions linked to the current user.
 *
 * If the user isn't authenticated then return null.
 */
export const fetchSessions = async () => {
  const userId = auth.currentUser?.uid

  if (!userId) {
    return []
  }

  const sessionsDocSnap = await getDocs(
    query(collection(db, 'sessions'), where('user', '==', userId))
  )

  return sessionsDocSnap.docs
}

/**
 * Fetch all the sessions linked to the current user.
 *
 * If the user isn't authenticated then return null.
 */
export const fetchAllSessions = async () => {
  const userId = auth.currentUser?.uid

  if (!userId) {
    return []
  }

  const sessionsDocSnap = await getDocs(
    query(
      collection(db, 'sessions'),
      orderBy('createdAt', 'desc'),
      where('user', '==', userId)
    )
  )

  return sessionsDocSnap.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      } as Session)
  )
}
