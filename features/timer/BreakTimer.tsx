import { Box, Button, Stack, Text } from '@chakra-ui/react'
import AnimatingBlob from '@/components/AnimatingBlob'
import useSettingsStore from '@/store/useSettingsStore'
import BeginFocusButton from './BeginFocusButton'
import useTimer from '@/hooks/useTimer'
import { humanizeTimeLeft } from '@/utils/time'
import { format } from 'date-fns'

const BreakTimer = () => {
  const { timeLeft, endTime, stop } = useTimer()
  const { breakDuration } = useSettingsStore()

  const totalTimeInSeconds = breakDuration
  const timeLeftInSeconds = timeLeft.minutes * 60 + timeLeft.seconds

  const baseSize = 0.1
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
          <Button onClick={stop}>End Session</Button>
          <BeginFocusButton />
        </Stack>
      )}
      {!done && (
        <Text
          pos="fixed"
          textTransform="uppercase"
          color="#F5F2ED"
          fontWeight="500"
          fontSize="14px"
        >
          Stand up and stretch you lazy fuck
        </Text>
      )}
      {!done && (
        <Stack pos="fixed" spacing="2" bottom="10" align="center">
          <Button onClick={stop}>End Session</Button>
          {endTime && <Text>Ends at {format(endTime, 'hh:mm')}</Text>}
        </Stack>
      )}
    </>
  )
}

export default BreakTimer
