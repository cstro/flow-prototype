import { Box, Stack, Text } from '@chakra-ui/react'
import {
  humanizeDateAsTime,
  humanizeSeconds,
  humanizeTimeLeft,
} from '@/utils/time'
import useTimer from '@/hooks/useTimer'
import useSettingsStore from '@/store/useSettingsStore'

const DebugOverlay = () => {
  const { debugOverlay } = useSettingsStore()

  const {
    duration,
    state,
    startTime,
    originalEndTime,
    endTime,
    timePaused,
    type,
    timeLeft,
    notifiedAt,
  } = useTimer()

  if (!debugOverlay) {
    return null
  }

  return (
    <Box
      position="fixed"
      bottom="2"
      left="2"
      p="4"
      fontSize="sm"
      opacity="0.4"
      bg="gray.100"
      borderRadius="4"
      _hover={{
        opacity: 1,
      }}
    >
      <Stack>
        <Text>State: {state}</Text>
        <Text>Session: {type}</Text>
        <Text>Time Left: {humanizeTimeLeft(timeLeft)}</Text>
        <Text>Start Time: {humanizeDateAsTime(startTime)}</Text>
        <Text>Duration: {humanizeSeconds(duration)}</Text>
        <Text>Original End Time: {humanizeDateAsTime(originalEndTime)}</Text>
        <Text>Time Paused: {humanizeSeconds(timePaused)}</Text>
        <Text>End Time: {humanizeDateAsTime(endTime)}</Text>
        <Text>Notified at: {humanizeDateAsTime(notifiedAt)}</Text>
      </Stack>
    </Box>
  )
}

export default DebugOverlay
