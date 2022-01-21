export enum SessionType {
  focus = 'focus',
  break = 'break',
}

export type Session = {
  id: string
  createdAt: Date
  duration: number
  type: SessionType
  user: string
}
