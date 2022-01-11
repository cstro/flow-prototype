import { Button } from '@chakra-ui/react'
import { addMinutes } from 'date-fns'
import useSound from 'use-sound'
import useSessionStore from '../../store'
import useSettingsStore from '../../store/useSettingsStore'
import { SessionType } from '../../types'
import { TimerStatus } from '../../types/timer'
import { getTimeLeft } from '../../utils'

const BeginBreakButton = () => {
  const { setStatus, setTimeLeft, setType } = useSessionStore()
  const { breakDuration } = useSettingsStore()
  const [chime] = useSound('/sounds/chime.mp3')

  const beginSession = async () => {
    await Notification.requestPermission()
    // TODO: Fix the status being stuck in tracking.
    // if (status === TimerStatus.tracking) {
    //   return
    // }

    setStatus(TimerStatus.tracking)
    setType(SessionType.break)

    const now = new Date()
    const endTime = addMinutes(now, breakDuration)

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
          new Notification('Time to focus!')

          clearInterval(interval)
        }, 1000)
      }
    }, 200)
  }

  return (
    <>
      <Button
        colorScheme="pink"
        size="lg"
        width="244px"
        height="56px"
        borderRadius="50px"
        fontSize="13px"
        onClick={beginSession}
      >
        Begin Break
      </Button>
    </>
  )
}

export default BeginBreakButton
