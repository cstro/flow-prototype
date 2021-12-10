import type { NextPage } from 'next'
import { addMinutes } from 'date-fns'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Button, Stack, Text } from '@chakra-ui/react'

const FOCUS_DURATION = 25
const BREAK_DURATION = 5

const Home: NextPage = () => {
  let interval = useRef<NodeJS.Timer>();

  const [focusEndTime, setFocusEndTime] = useState<number | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<number | null>(null);

  const [minutesLeft, setMinutesLeft] = useState<number>(FOCUS_DURATION);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const beginFocus = async () => {
    await Notification.requestPermission();
    clearInterval(Number(interval.current));
    interval.current = undefined;
    setBreakEndTime(null)

    setFocusEndTime(addMinutes(new Date(), FOCUS_DURATION).getTime())
  }

  const beginBreak = () => {
    clearInterval(Number(interval.current));
    interval.current = undefined;
    setFocusEndTime(null)

    setBreakEndTime(addMinutes(new Date(), BREAK_DURATION).getTime())
  }

  useEffect(() => {
    const focusCountDown = () => {
      const now = new Date().getTime();

      const distance = Number(focusEndTime) - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setMinutesLeft(minutes);
      setSecondsLeft(seconds)

      if (distance <= 0) {
        clearInterval(Number(interval.current));
        interval.current = undefined;
        setFocusEndTime(null)

        showNotification('Focus session finished', 'Time to take a break!')
      }
    }

    if (focusEndTime) {
      focusCountDown()
      interval.current = setInterval(focusCountDown, 1000);
    }
  }, [focusEndTime]);


  useEffect(() => {
    const breakCountDown = () => {
      const now = new Date().getTime();

      const distance = Number(breakEndTime) - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setMinutesLeft(Math.max(minutes, 0));
      setSecondsLeft(Math.max(seconds, 0))

      if (distance <= 0) {
        clearInterval(Number(interval.current));
        interval.current = undefined;
        setBreakEndTime(null)

        showNotification('Break finished', 'Time to start focusing!')
      }
    }


    if (breakEndTime) {
      breakCountDown()
      interval.current = setInterval(breakCountDown, 1000);
    }
  }, [breakEndTime]);

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
          <Box bg="blue.500" color="white" px="24" py="20" lineHeight="1" borderRadius="50%">
            <Text align="center">Focus</Text>
            <Text fontSize="60px" lineHeight="71px">{String(FOCUS_DURATION).padStart(2, '0')}</Text>
          </Box>
          <Box marginLeft="-4" bg="pink.100" color="white" px="10" py="8" lineHeight="1" borderRadius="50%">
            <Text align="center">Break</Text>
            <Text  fontSize="60px" lineHeight="71px">{String(BREAK_DURATION).padStart(2, '0')}</Text>
          </Box>
        </Stack>

        {/* <Stack direction="row" spacing="4">
          <Stack direction="row" alignItems="center" spacing="1">
            <Text fontSize="5xl">{String(minutesLeft).padStart(2, '0')}</Text>
            <Text fontSize="lg">m</Text>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="1">
            <Text fontSize="5xl">{String(secondsLeft).padStart(2, '0')}</Text>
            <Text fontSize="lg">s</Text>
          </Stack>
        </Stack> */}

        {Boolean(focusEndTime && interval.current) && <Text fontSize="lg">Time to focus...</Text>}
        {Boolean(breakEndTime && interval.current) && <Text fontSize="lg">Take a break...</Text>}

        <Button disabled={Boolean(focusEndTime && interval.current)} colorScheme="blue" size='lg' width='244px' height='56px' borderRadius='50px' fontSize="13px" onClick={beginFocus}>Begin Focus</Button>
        <Button disabled={Boolean(breakEndTime && interval.current)} colorScheme="pink" size='lg' width='244px' height='56px' borderRadius='50px' fontSize="13px" onClick={beginBreak}>Begin Break</Button>
        </Stack>
      </main>
    </div>
  )
}

export default Home
