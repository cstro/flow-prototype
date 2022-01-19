import { Box, Stack, Text } from '@chakra-ui/react'
import AnimatingBlob from '../../components/animating-blob'
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
      ? 2.5
      : timeLeftInSeconds / totalTimeInSeconds + 0.1

  const size = `${progress * 100}vmax`
  const size2 = `${progress * 1.1 * 100}vmax`

  return (
    <>
      <Box w={size} h={size} transition="all 1000ms linear" pos="fixed">
        <AnimatingBlob bg="#FBADC5" />
      </Box>
      <Box
        w={size2}
        h={size2}
        transition="all 1000ms linear"
        pos="fixed"
        opacity="0.1"
      >
        <AnimatingBlob bg="#FBADC5" />
      </Box>
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
