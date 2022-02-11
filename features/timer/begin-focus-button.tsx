import { Button } from '@chakra-ui/react'
import useSettingsStore from '@/store/useSettingsStore'
import useTimer from '@/hooks/useTimer'

const BeginFocusButton = () => {
  const { focusDuration } = useSettingsStore()

  const { start } = useTimer()

  const beginSession = async () => {
    await Notification.requestPermission()
    start(focusDuration, 'focus')
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
