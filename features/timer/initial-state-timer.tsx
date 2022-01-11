import { Box, Stack, Text } from '@chakra-ui/react'
import BeginFocusButton from './begin-focus-button'

const InitialStateTimer = () => {
  return (
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
  )
}

export default InitialStateTimer
