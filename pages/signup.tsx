import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import Card from '@/components/Card'
import Link from '@/components/Link'
import SignUpForm from '@/features/auth/SignUpForm'

const SignUp: NextPage = () => (
  <Box
    bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '4', lg: '8' }}
  >
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Create an account
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Already have an account?</Text>
        <Link href="/login">Login here</Link>
      </Text>
      <Card>
        <SignUpForm />
      </Card>
    </Box>
  </Box>
)

export default SignUp
