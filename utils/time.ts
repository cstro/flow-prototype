import { differenceInMilliseconds } from 'date-fns'
import { Time } from '@/types/timer'

export const getTimeLeft = (endTime: Date) => {
  const difference = differenceInMilliseconds(endTime, new Date())
  const timeLeft: Time = { minutes: 0, seconds: 0 }

  if (difference > 0) {
    const differenceInSeconds = difference / 1000
    timeLeft.minutes = Math.floor((differenceInSeconds / 60) % 60)
    timeLeft.seconds = Math.floor(differenceInSeconds % 60)
  }

  return timeLeft
}
