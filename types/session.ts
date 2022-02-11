export type SessionType = 'focus' | 'break'

export type Session = {
  id: string
  createdAt: Date
  duration: number
  type: SessionType
  user: string
}
