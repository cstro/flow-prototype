import type { NextPage } from 'next'
import { addMinutes } from 'date-fns'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BlobPlayButton from '../components/BlobPlayButton'
import { Box, Button, ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react'
import { FiPlay, FiPause, FiRefreshCw, FiSettings } from "react-icons/fi"

const MINUTES_TO_ADD = 1

const Home: NextPage = () => {
  let interval = useRef<NodeJS.Timer>();

  const [endTime, setEndTime] = useState<number | null>(null);
  const [minutesLeft, setMinutesLeft] = useState<number>(MINUTES_TO_ADD);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const loop = () => {
    var now = new Date().getTime();

    var distance = Number(endTime) - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setMinutesLeft(minutes);
    setSecondsLeft(seconds)

    if (distance < 0) {
      clearInterval(Number(interval.current));
      interval.current = undefined;
      setEndTime(null)

      showNotification()
    }
  }

  const startSession = () => {
    setEndTime(addMinutes(new Date(), MINUTES_TO_ADD).getTime())
  }

  useEffect(() => {
    if (endTime) {
      loop()
      interval.current = setInterval(loop, 1000);
    }
  }, [endTime]);

  const showNotification = async () => {
    var options = {
      body: 'Time to take a break!'
    }
    new Notification('Test notification', options)
  }

  const displayMinutes = minutesLeft + (secondsLeft % 60 !== 0 ? 1 : 0)

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
            <Text fontSize="60px" lineHeight="71px">{String(displayMinutes).padStart(2, '0')}</Text>
          </Box>
          <Box marginLeft="-4" bg="pink.100" color="white" px="10" py="8" lineHeight="1" borderRadius="50%">
            <Text align="center">Break</Text>
            <Text  fontSize="60px" lineHeight="71px">05</Text>
          </Box>
        </Stack>

          <Button disabled={Boolean(interval.current)} colorScheme="blue" size='lg' width='244px' height='56px' borderRadius='50px' fontSize="13px" onClick={startSession}>Begin Focus</Button>
        </Stack>
      </main>
    </div>
  )
}

export default Home
