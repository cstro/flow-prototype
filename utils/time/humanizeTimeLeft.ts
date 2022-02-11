import { Time } from '@/types/timer'

const humanizeTimeLeft = (timeLeft: Time) => {
  const seconds = String(Math.abs(timeLeft.seconds)).padStart(2, '0')

  const isNegative = timeLeft.minutes < 0 || timeLeft.seconds < 0

  return `${isNegative ? '+ ' : ''}${Math.abs(timeLeft.minutes)}:${seconds}`
}

export default humanizeTimeLeft
