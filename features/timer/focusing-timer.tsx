import { Box, Text, Stack } from '@chakra-ui/react'
import AnimatingBlob from '../../components/animating-blob'
import useSessionStore from '../../store'
import useSettingsStore from '../../store/useSettingsStore'
import BeginBreakButton from './begin-break-button'

const FocusingTimer = () => {
  const { timeLeft } = useSessionStore()
  const { focusDuration } = useSettingsStore()

  const totalTimeInSeconds = focusDuration * 60
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const progress =
    timeLeftInSeconds === 0
      ? 2.5
      : Math.max(1 - timeLeftInSeconds / totalTimeInSeconds, 0.1)

  const size = `${progress * 100}vmax`
  const size2 = `${progress * 1.1 * 100}vmax`

  return (
    <>
      <Box w={size} h={size} transition="all 1000ms linear" pos="fixed">
        <AnimatingBlob bg="#126BFB" />
      </Box>
      <Box
        w={size2}
        h={size2}
        transition="all 1000ms linear"
        pos="fixed"
        opacity="0.1"
      >
        <AnimatingBlob bg="#126BFB" />
      </Box>
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
