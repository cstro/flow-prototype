import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  chakra,
  CloseButton,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebaseApp from '@/services/firebase/app'
import PasswordField from '@/components/PasswordField'

const SignUpForm = (props: HTMLChakraProps<'form'>) => {
  const router = useRouter()

  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(email, password)
        router.push('/')
      }}
      {...props}
    >
      <Stack spacing="6">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          isLoading={Boolean(loading)}
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Create account
        </Button>
      </Stack>
    </chakra.form>
  )
}

export default SignUpForm
