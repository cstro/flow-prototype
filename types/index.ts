export type SessionType = 'focus' | 'break'

export type Session = {
  id: string
  from: number
  to: number
  type: SessionType
  completed?: boolean
}
