import { Button } from '@chakra-ui/react'
import useSettingsStore from '@/store/useSettingsStore'
import useTimer from '@/hooks/useTimer'

const BeginBreakButton = () => {
  const { breakDuration } = useSettingsStore()

  const { start } = useTimer()

  const beginSession = async () => {
    await Notification.requestPermission()
    start(breakDuration, 'break')
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
