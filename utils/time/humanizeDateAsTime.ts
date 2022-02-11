import { format } from 'date-fns'

const humanizeDateAsTime = (date?: Date) => {
  if (!date) {
    return null
  }

  return format(date, 'pp')
}

export default humanizeDateAsTime
