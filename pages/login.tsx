import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import Card from '@/components/Card'
import Link from '@/components/Link'
import LoginForm from '@/features/auth/LoginForm'

const SignUp: NextPage = () => (
  <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Login to your account
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Don&apos;t have an account?</Text>
        <Link href="/signup">Sign up for free</Link>
      </Text>
      <Card>
        <LoginForm />
      </Card>
    </Box>
  </Box>
)

export default SignUp
