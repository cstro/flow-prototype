import {
  Box,
  Text,
  Stack,
  Button,
  IconButton,
  Icon,
  Tooltip,
} from '@chakra-ui/react'
import AnimatingBlob from '@/components/animating-blob'
import useSettingsStore from '@/store/useSettingsStore'
import BeginBreakButton from './begin-break-button'
import { humanizeTimeLeft } from '@/utils/time'
import useTimer from '@/hooks/useTimer'
import { IoPlaySkipForwardOutline, IoStopOutline } from 'react-icons/io5'

const FocusingTimer = () => {
  const { focusDuration } = useSettingsStore()

  const { pause, resume, timeLeft, isPaused, stop, skip } = useTimer()

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
          <Stack direction="row" spacing="8" align="center">
            {isPaused && (
              <>
                <Tooltip
                  hasArrow
                  placement="bottom"
                  label="End Session"
                  bg="black"
                  color="white"
                >
                  <IconButton
                    variant="ghost"
                    size="lg"
                    colorScheme="blue"
                    width="auto"
                    borderRadius="50%"
                    aria-label="End Session"
                    onClick={stop}
                    icon={<Icon as={IoStopOutline} />}
                  />
                </Tooltip>
                <Button onClick={resume}>Continue</Button>
                <Tooltip
                  hasArrow
                  placement="bottom"
                  label="Skip to Break"
                  bg="black"
                  color="white"
                >
                  <IconButton
                    variant="ghost"
                    size="lg"
                    colorScheme="blue"
                    width="auto"
                    borderRadius="50%"
                    aria-label="End Session"
                    onClick={skip}
                    icon={<Icon as={IoPlaySkipForwardOutline} />}
                  />
                </Tooltip>
              </>
            )}
            {!isPaused && (
              <Button colorScheme="gray" onClick={pause}>
                Pause Focus
              </Button>
            )}
          </Stack>
          {timeLeft.minutes < 2 && (
            <Text fontSize="lg" color="white" p="2" borderRadius="2">
              {humanizeTimeLeft(timeLeft)} minutes remaining
            </Text>
          )}
        </Stack>
      )}
      {done && (
        <Stack
          pos="fixed"
          spacing="0"
          align="center"
          textAlign="center"
          maxW="xs"
        >
          <Text
            textTransform="uppercase"
            fontSize="14px"
            fontWeight="500"
            color="#F5F2ED"
          >
            Focus time ended
          </Text>
          <Text
            fontSize="60px"
            lineHeight="1"
            color="white"
            p="2"
            borderRadius="2"
          >
            {humanizeTimeLeft(timeLeft)}
          </Text>
          <Text
            textTransform="uppercase"
            fontSize="14px"
            fontWeight="500"
            color="#F5F2ED"
          >
            You can carry on working and we’ll remind you to take break every 5
            minutes
          </Text>
        </Stack>
      )}
      {done && (
        <Stack direction="column" pos="fixed" bottom="10" spacing="4">
          <BeginBreakButton />
          <Button colorScheme="gray" variant="outline" onClick={stop}>
            End session
          </Button>
        </Stack>
      )}
    </>
  )
}

export default FocusingTimer
