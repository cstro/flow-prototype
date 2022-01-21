import { Avatar } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from '../../components/link'
import firebaseAuth from '../../services/firebase/auth'

const UserIcon = () => {
  const [user] = useAuthState(firebaseAuth)

  if (user) {
    return (
      <Avatar
        pos="fixed"
        top="5"
        left="5"
        name={user.email ?? ''}
        src={user.photoURL ?? ''}
      />
    )
  }

  return (
    <Link pos="absolute" top="5" left="5" href="/login">
      Login
    </Link>
  )
}

export default UserIcon
