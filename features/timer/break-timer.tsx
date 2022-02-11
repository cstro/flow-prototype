import { Box, Stack, Text } from '@chakra-ui/react'
import AnimatingBlob from '@/components/animating-blob'
import useSettingsStore from '@/store/useSettingsStore'
import BeginFocusButton from './begin-focus-button'
import useTimer from '@/hooks/useTimer'
import { humanizeTimeLeft } from '@/utils/time'

const BreakTimer = () => {
  const { timeLeft } = useTimer()
  const { breakDuration } = useSettingsStore()

  const totalTimeInSeconds = breakDuration
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const baseSize = 0.2
  const progressSpan = 1 - baseSize
  const progress = Math.max(timeLeftInSeconds, 0) / totalTimeInSeconds

  const size = baseSize + progressSpan * progress

  const done = timeLeft.minutes <= 0 && timeLeft.seconds <= 0

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
      {done && (
        <Stack pos="fixed" spacing="2" align="center">
          <Text fontSize="lg" color="white">
            Break over!
          </Text>
          {timeLeft.minutes < 0 && (
            <Text fontSize="lg" color="white" p="2" borderRadius="2">
              {humanizeTimeLeft(timeLeft)}
            </Text>
          )}
          <BeginFocusButton />
        </Stack>
      )}
    </>
  )
}

export default BreakTimer
