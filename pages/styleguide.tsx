import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const StyleGuide: NextPage = () => {
  return (
    <>
      <Head>
        <title>StyleGuide</title>
      </Head>

      <Container mt="20">
        <Stack spacing="10">
          <Heading size="4xl">Style guide</Heading>
          <Stack align="flex-start" spacing="4">
            <Heading id="buttons" size="xl">
              Buttons
            </Heading>

            <Button>Button</Button>
            <Button colorScheme="pink">Button</Button>
            <Button colorScheme="gray" variant="outline">
              Button
            </Button>
            <Button colorScheme="blue" variant="outline">
              Button
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
export default StyleGuide
