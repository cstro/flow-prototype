import type { NextPage } from 'next'
import Head from 'next/head'
import BreakTimer from '@/features/timer/break-timer'
import FocusingTimer from '@/features/timer/focusing-timer'
import InitialStateTimer from '@/features/timer/initial-state-timer'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import useTimer from '@/hooks/useTimer'
import {
  humanizeDateAsTime,
  humanizeSeconds,
  humanizeTimeLeft,
} from '@/utils/time'

const Home: NextPage = () => {
  const {
    duration,
    isStopped,
    isFocus,
    isBreak,
    state,
    startTime,
    originalEndTime,
    endTime,
    timePaused,
    type,
    timeLeft,
    notifiedAt,
  } = useTimer()

  return (
    <>
      <Head>
        <title>Flow Prototype</title>
      </Head>

      <Flex height="100vh" align="center" justify="center">
        {isStopped && <InitialStateTimer />}

        {!isStopped && isFocus && <FocusingTimer />}

        {!isStopped && isBreak && <BreakTimer />}
      </Flex>

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
    </>
  )
}

export default Home
