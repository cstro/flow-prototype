import { Box, Stack, Text } from '@chakra-ui/react'
import { SettingsIcon, TimeIcon } from '@chakra-ui/icons'
import Link from '@/components/Link'
import UserIcon from '@/features/auth/UserIcon'
import BeginFocusButton from './BeginFocusButton'

const InitialStateTimer = () => {
  return (
    <>
      <Stack spacing="10" align="center">
        <Stack direction="row" align="center">
          <Box
            bg="blue.500"
            color="white"
            px="24"
            py="20"
            lineHeight="1"
            borderRadius="50%"
          >
            <Text align="center">Focus</Text>
            <Text fontSize="60px" lineHeight="71px">
              25
            </Text>
          </Box>
          <Box
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
              05
            </Text>
          </Box>
        </Stack>

        <Stack spacing="4" align="center">
          <BeginFocusButton />
        </Stack>
      </Stack>
      <UserIcon />
      <Box pos="fixed" top="5" right="5">
        <Link href="/sessions" title="Session History">
          <TimeIcon />
        </Link>
      </Box>
      <Box pos="fixed" top="12" right="5">
        <Link href="/settings" title="Settings">
          <SettingsIcon />
        </Link>
      </Box>
    </>
  )
}

export default InitialStateTimer
