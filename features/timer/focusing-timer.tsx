import { Box, Text, Stack } from '@chakra-ui/react'
import useSessionStore from '../../store'
import useSettingsStore from '../../store/useSettingsStore'
import BeginBreakButton from './begin-break-button'

const FocusingTimer = () => {
  const { timeLeft } = useSessionStore()
  const { focusDuration } = useSettingsStore()

  const totalTimeInSeconds = focusDuration * 60
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const progress = 1 - timeLeftInSeconds / totalTimeInSeconds + 0.5

  let size = '100vw'
  if (window.innerHeight > window.innerWidth) {
    size = '100vh'
  }

  return (
    <>
      <Box
        bg="blue.500"
        color="white"
        w={size}
        h={size}
        transition={'transform 800ms ease-in-out'}
        transform={`scale(${progress})`}
        pos="fixed"
        lineHeight="1"
        borderRadius="50%"
        display="flex"
        align="center"
        justify="center"
      />
      {timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <Stack pos="fixed" spacing="4" align="center">
          <Text fontSize="lg" color="white">
            Session complete
          </Text>
          <BeginBreakButton />
        </Stack>
      )}
    </>
  )
}

export default FocusingTimer
