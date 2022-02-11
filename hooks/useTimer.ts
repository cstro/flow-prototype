import TimerContext from '@/features/timer/timer-context'
import React from 'react'

const useTimer = () => {
  const context = React.useContext(TimerContext)
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
}

export default useTimer
