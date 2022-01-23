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

  const baseSize = 0.25
  const progressSpan = 1 - baseSize
  const progress = 1 - timeLeftInSeconds / totalTimeInSeconds

  const size = baseSize + progressSpan * progress

  console.log(baseSize, progressSpan, progress, size)

  return (
    <>
      {(timeLeft.minutes !== 0 || timeLeft.seconds !== 0) && (
        <>
          <Box
            w={`150vmax`}
            h={`150vmax`}
            transition="transform 500ms linear"
            transform={`scale(${size})`}
            pos="fixed"
            willChange="transform"
          >
            <AnimatingBlob bg="#126BFB" />
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
            <AnimatingBlob bg="#126BFB" />
          </Box>
        </>
      )}
      <Box
        w={`150vmax`}
        h={`150vmax`}
        transition="transform 2500ms linear"
        transform={`scale(${
          timeLeft.minutes === 0 && timeLeft.seconds < 4 ? size : 0
        })`}
        willChange="transform"
        pos="fixed"
        bg="blue.500"
        borderRadius="50%"
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
