import { Button } from '@chakra-ui/react'
import { addMinutes } from 'date-fns'
import useSound from 'use-sound'
import useSessionStore from '../../store'
import useSettingsStore from '../../store/useSettingsStore'
import { SessionType } from '../../types'
import { TimerStatus } from '../../types/timer'
import { getTimeLeft } from '../../utils'

const BeginFocusButton = () => {
  const { setStatus, setTimeLeft, setType } = useSessionStore()
  const { focusDuration } = useSettingsStore()
  const [chime] = useSound('/sounds/chime.mp3')

  const beginSession = async () => {
    await Notification.requestPermission()

    // TODO: Fix the status being stuck in tracking.
    // if (status === TimerStatus.tracking) {
    //   return
    // }

    setStatus(TimerStatus.tracking)
    setType(SessionType.focus)
    setTimeLeft({ minutes: 0, seconds: 0 })

    const now = new Date()
    const endTime = addMinutes(now, focusDuration)

    const interval = setInterval(() => {
      const calculatedTimeLeft = getTimeLeft(endTime)
      setTimeLeft(calculatedTimeLeft)
      console.debug(calculatedTimeLeft)

      if (
        calculatedTimeLeft.minutes === 0 &&
        calculatedTimeLeft.seconds === 0
      ) {
        setTimeout(async () => {
          chime()
          new Notification('Take a break')
        }, 1000)
        clearInterval(interval)
      }
    }, 200)
  }

  return (
    <>
      <Button
        colorScheme="blue"
        size="lg"
        width="244px"
        height="56px"
        borderRadius="50px"
        fontSize="13px"
        onClick={beginSession}
      >
        Begin Focus
      </Button>
    </>
  )
}

export default BeginFocusButton
