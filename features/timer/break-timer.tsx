import { Box, Stack, Text } from '@chakra-ui/react'
import AnimatingBlob from '@/components/animating-blob'
import useSessionStore from '@/store/useSessionStore'
import useSettingsStore from '@/store/useSettingsStore'
import BeginFocusButton from './begin-focus-button'

const BreakTimer = () => {
  const { timeLeft } = useSessionStore()
  const { breakDuration } = useSettingsStore()

  const totalTimeInSeconds = breakDuration * 60
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const baseSize = 0.25
  const progressSpan = 1 - baseSize
  const progress = timeLeftInSeconds / totalTimeInSeconds

  const size = baseSize + progressSpan * progress

  return (
    <>
      <Box
        w={`150vmax`}
        h={`150vmax`}
        transition="transform 500ms linear"
        transform={`scale(${size})`}
        pos="fixed"
        willChange="transform"
      >
        <AnimatingBlob bg="#FBADC5" />
      </Box>
      <Box
        w={`150vmax`}
        h={`150vmax`}
        transition="transform 500ms linear"
        transform={`scale(${size + 0.015})`}
        willChange="transform"
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
