import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import firebaseApp from '@/services/firebase/app'
import PasswordField from '@/components/PasswordField'

const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const router = useRouter()

  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
        router.push('/')
      }}
      {...props}
    >
      <Stack spacing="6">
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
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  )
}

export default LoginForm
