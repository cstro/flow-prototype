export type SessionType = 'focus' | 'break'

export type Session = {
  id: string
  from: Date
  to: Date
  type: SessionType
  completed?: boolean
}
