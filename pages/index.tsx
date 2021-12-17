import { Box, Button, keyframes, Stack, Text } from '@chakra-ui/react'
import { differenceInMinutes, differenceInSeconds, format } from 'date-fns'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import useSessionStore from '../store/useSessionStore'
import styles from '../styles/Home.module.css'

const FOCUS_DURATION = 25
const BREAK_DURATION = 5

const spin = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.2)}
  100% {transform: scale(1)}
`

const Home: NextPage = () => {
  const interval = useRef<NodeJS.Timer>()

  const { sessions, startNextSession, currentSession } = useSessionStore()

  const spinAnimation = `${spin} infinite 10s ease-in-out`

  const [minutesLeft, setMinutesLeft] = useState<number>(FOCUS_DURATION)

  const beginFocus = async () => {
    await Notification.requestPermission()

    clearInterval(Number(interval.current))
    interval.current = undefined

    startNextSession('focus', FOCUS_DURATION)
  }

  const beginBreak = () => {
    clearInterval(Number(interval.current))
    interval.current = undefined

    startNextSession('break', BREAK_DURATION)
  }

  useEffect(() => {
    const focusCountDown = () => {
      const now = new Date()

      if (!currentSession) {
        return
      }

      setMinutesLeft(differenceInMinutes(currentSession.to, now))

      if (differenceInSeconds(currentSession.to, now) <= 0) {
        clearInterval(Number(interval.current))
        interval.current = undefined

        if (currentSession.type === 'break') {
          showNotification('Break finished', 'Time to start focusing!')
        } else {
          showNotification('Focus session finished', 'Time to take a break!')
        }
      }
    }

    interval.current = setInterval(focusCountDown, 1000)
  }, [currentSession])

  const showNotification = async (title: string, body: string) => {
    const options = { body }
    new Notification(title, options)
  }

  const isFocusing = currentSession?.type === 'focus'
  const isOnBreak = currentSession?.type === 'break'

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow Prototype</title>
      </Head>

      <main className={styles.main}>
        <Stack spacing="10" align="center">
          <Stack direction="row" align="center">
            <Box
              animation={isFocusing ? spinAnimation : undefined}
              bg="blue.500"
              color="white"
              px="24"
              py="20"
              lineHeight="1"
              borderRadius="50%"
            >
              <Text align="center">Focus</Text>
              <Text fontSize="60px" lineHeight="71px">
                {String(minutesLeft).padStart(2, '0')}
              </Text>
            </Box>
            <Box
              animation={isOnBreak ? spinAnimation : undefined}
              marginLeft="-4"
              bg="pink.100"
              color="white"
              px="10"
              py="8"
              lineHeight="1"
              borderRadius="50%"
            >
              <Text align="center">Break</Text>
              <Text fontSize="60px" lineHeight="71px">
                {String(BREAK_DURATION).padStart(2, '0')}
              </Text>
            </Box>
          </Stack>

          {isFocusing && <Text fontSize="lg">Time to focus...</Text>}
          {isOnBreak && <Text fontSize="lg">Take a break...</Text>}

          <Button
            disabled={isFocusing}
            colorScheme="blue"
            size="lg"
            width="244px"
            height="56px"
            borderRadius="50px"
            fontSize="13px"
            onClick={beginFocus}
          >
            Begin Focus
          </Button>
          <Button
            disabled={isOnBreak}
            colorScheme="pink"
            size="lg"
            width="244px"
            height="56px"
            borderRadius="50px"
            fontSize="13px"
            onClick={beginBreak}
          >
            Begin Break
          </Button>
        </Stack>
        {Object.values(sessions).map((session) => {
          return (
            <div key={session.id}>
              {session.type}: {getTime(session.from)} - {getTime(session.to)}
            </div>
          )
        })}
      </main>
    </div>
  )
}

const getTime = (date: Date) => {
  return format(date, 'HH:mmaaa')
}

export default Home
