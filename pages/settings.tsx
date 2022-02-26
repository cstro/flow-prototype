import Link from '@/components/Link'
import useSettingsStore from '@/store/useSettingsStore'
import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Switch,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const StyleGuide: NextPage = () => {
  const { debugOverlay, toggleDebugOverlay } = useSettingsStore()

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <Container mt="20">
        <Stack spacing="10">
          <Link href="/">Back</Link>
          <Heading size="4xl">Settings</Heading>

          <Stack spacing="4">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="debug-overlay" mb="0">
                Show debug overlay
              </FormLabel>
              <Switch
                id="debug-overlay"
                defaultChecked={debugOverlay}
                isChecked={debugOverlay}
                onChange={toggleDebugOverlay}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
export default StyleGuide
