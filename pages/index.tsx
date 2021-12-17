import { Box, Button, keyframes, Stack, Text } from '@chakra-ui/react'
import {
  differenceInMinutes,
  differenceInSeconds,
  format,
  fromUnixTime,
  isToday,
} from 'date-fns'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import SessionLogModal from '../features/sessions/session-log-modal'

import useSessionStore from '../store'
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
  const isFocusing = useBoolean(false)
  const isOnBreak = useBoolean(false)

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

      const { to, type } = currentSession

      setMinutesLeft(differenceInMinutes(fromUnixTime(to), now))

      if (differenceInSeconds(fromUnixTime(to), now) <= 0) {
        clearInterval(Number(interval.current))
        interval.current = undefined

        if (type === 'break') {
          showNotification('Break finished', 'Time to start focusing!')
        } else {
          showNotification('Focus session finished', 'Time to take a break!')
        }
      }
    }

    focusCountDown()
    interval.current = setInterval(focusCountDown, 1000)
  }, [currentSession])

  useEffect(() => {
    if (!currentSession) {
      return
    }

    isFocusing.setValue(currentSession.type === 'focus')
    isOnBreak.setValue(currentSession.type === 'break')
  }, [currentSession])

  const showNotification = async (title: string, body: string) => {
    const options = { body }
    new Notification(title, options)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Flow Prototype</title>
      </Head>

      <main className={styles.main}>
        <Stack spacing="10" align="center">
          <Stack direction="row" align="center">
            <Box
              animation={isFocusing.value ? spinAnimation : undefined}
              bg="blue.500"
              color="white"
              px="24"
              py="20"
              lineHeight="1"
              borderRadius="50%"
            >
              <Text align="center">Focus</Text>
              <Text fontSize="60px" lineHeight="71px">
                {String(
                  isFocusing.value ? minutesLeft : FOCUS_DURATION
                ).padStart(2, '0')}
              </Text>
            </Box>
            <Box
              animation={isOnBreak.value ? spinAnimation : undefined}
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
                {String(
                  isOnBreak.value ? minutesLeft : BREAK_DURATION
                ).padStart(2, '0')}
              </Text>
            </Box>
          </Stack>

          {isFocusing.value && <Text fontSize="lg">Time to focus...</Text>}
          {isOnBreak.value && <Text fontSize="lg">Take a break...</Text>}

          <Button
            disabled={isFocusing.value}
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
            disabled={isOnBreak.value}
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
        {Object.values(sessions)
          .filter(
            (session) =>
              isToday(fromUnixTime(session.to)) ||
              isToday(fromUnixTime(session.from))
          )
          .map((session) => {
            return (
              <div key={session.id}>
                {session.type}: {getTime(session.from)} - {getTime(session.to)}
              </div>
            )
          })}
        <SessionLogModal />
      </main>
    </div>
  )
}

const getTime = (timestamp: number | string) => {
  return format(fromUnixTime(Number(timestamp)), 'HH:mmaaa')
}

export default Home
