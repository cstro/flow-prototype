import type { NextPage } from 'next'
import Head from 'next/head'
import BreakTimer from '@/features/timer/BreakTimer'
import FocusingTimer from '@/features/timer/FocusingTimer'
import InitialStateTimer from '@/features/timer/InitialStateTimer'
import { Flex } from '@chakra-ui/react'
import useTimer from '@/hooks/useTimer'
import DebugOverlay from '@/components/DebugOverlay'

const Home: NextPage = () => {
  const { isStopped, isFocus, isBreak } = useTimer()

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

      <DebugOverlay />
    </>
  )
}

export default Home
