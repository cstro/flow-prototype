import { Box, Text, Stack, Button } from '@chakra-ui/react'
import AnimatingBlob from '@/components/animating-blob'
import useSettingsStore from '@/store/useSettingsStore'
import BeginBreakButton from './begin-break-button'
import { humanizeTimeLeft } from '@/utils/time'
import useTimer from '@/hooks/useTimer'

const FocusingTimer = () => {
  const { focusDuration } = useSettingsStore()

  const { pause, resume, timeLeft, isPaused } = useTimer()

  const totalTimeInSeconds = focusDuration
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const baseSize = 0.1
  const progressSpan = 1 - baseSize
  const progress = 1 - timeLeftInSeconds / totalTimeInSeconds

  const size = baseSize + progressSpan * progress

  const done = timeLeft.minutes <= 0 && timeLeft.seconds <= 0

  return (
    <>
      {!done && (
        <>
          <Box
            w={`150vmax`}
            h={`150vmax`}
            transition="transform 500ms linear"
            transform={`scale(${size})`}
            pos="fixed"
            willChange="transform"
          >
            <AnimatingBlob bg="#126BFB" paused={isPaused} />
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
            <AnimatingBlob bg="#126BFB" paused={isPaused} />
          </Box>
        </>
      )}
      <Box
        w={`150vmax`}
        h={`150vmax`}
        transition="transform 2500ms linear"
        transform={`scale(${
          timeLeft.minutes <= 0 && timeLeft.seconds <= 4 ? size : 0
        })`}
        willChange="transform"
        pos="fixed"
        bg="blue.500"
        borderRadius="50%"
      />
      {!done && (
        <Stack pos="fixed" align="center" bottom="10">
          <Button
            onClick={() => (isPaused ? resume() : pause())}
            variant="outline"
            colorScheme="blue"
            size="lg"
            width="244px"
            height="56px"
            borderRadius="50px"
            fontSize="13px"
          >
            {isPaused ? 'Resume' : 'Pause'} Focus
          </Button>
          {timeLeft.minutes < 2 && (
            <Text fontSize="lg" color="white" p="2" borderRadius="2">
              {humanizeTimeLeft(timeLeft)} minutes remaining
            </Text>
          )}
        </Stack>
      )}
      {done && (
        <Stack pos="fixed" spacing="4" align="center">
          <Text fontSize="lg" color="white">
            Session complete
          </Text>
          {timeLeft.minutes < 0 && (
            <Text fontSize="lg" color="white" p="2" borderRadius="2">
              {humanizeTimeLeft(timeLeft)}
            </Text>
          )}
          <BeginBreakButton />
        </Stack>
      )}
    </>
  )
}

export default FocusingTimer
