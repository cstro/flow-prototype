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
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebaseApp from '../../services/firebase/app'
import { PasswordField } from '../../components/password-field'

const SignUpForm = (props: HTMLChakraProps<'form'>) => {
  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(email, password)
        console.log('done', user)
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
          isLoading={loading}
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  )
}

export default SignUpForm
