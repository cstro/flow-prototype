import { Box, Stack, Text } from '@chakra-ui/react'
import useSessionStore from '../../store'
import useSettingsStore from '../../store/useSettingsStore'
import BeginFocusButton from './begin-focus-button'

const BreakTimer = () => {
  const { timeLeft } = useSessionStore()
  const { breakDuration } = useSettingsStore()

  const totalTimeInSeconds = breakDuration * 60
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const progress =
    timeLeftInSeconds === totalTimeInSeconds
      ? 1.5
      : timeLeftInSeconds / totalTimeInSeconds + 0.1

  let size = '100vw'
  if (window.innerHeight > window.innerWidth) {
    size = '100vh'
  }

  return (
    <>
      <Box
        bg="pink.100"
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
          <BeginFocusButton />
        </Stack>
      )}
    </>
  )
}

export default BreakTimer
