import { differenceInMilliseconds, format } from 'date-fns'
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

export const humanizeSeconds = (totalSeconds: number) => {
  const minutes = String(Math.round(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(Math.round(totalSeconds % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

export const humanizeDateAsTime = (date?: Date) => {
  if (!date) {
    return null
  }

  return format(date, 'pp')
}

export const humanizeTimeLeft = (timeLeft: Time) => {
  const seconds = String(timeLeft.seconds).padStart(2, '0')

  return `${timeLeft.minutes}:${seconds} minutes remaining`
}
