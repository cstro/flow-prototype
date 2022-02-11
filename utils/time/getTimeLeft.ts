import { Time } from '@/types/timer'
import { differenceInMinutes, differenceInSeconds } from 'date-fns'

const getTimeLeft = (endTime: Date) => {
  const now = new Date()

  const timeLeft: Time = {
    minutes: differenceInMinutes(endTime, now),
    seconds: differenceInSeconds(endTime, now) % 60,
  }

  return timeLeft
}

export default getTimeLeft
