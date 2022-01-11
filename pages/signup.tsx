import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { NextPage } from 'next'
import { Card } from '../components/card'
import { DividerWithText } from '../components/divider-with-text'
import { Link } from '../components/link'
import SignUpForm from '../features/auth/sign-up-form'

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
        <DividerWithText mt="6">or continue with</DividerWithText>
        <SimpleGrid mt="6" columns={3} spacing="3">
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  </Box>
)

export default SignUp