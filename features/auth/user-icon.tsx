import { Avatar } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebaseAuth from '../../services/firebase/auth'

const UserIcon = () => {
  const [user] = useAuthState(firebaseAuth)

  if (user) {
    return (
      <Avatar
        pos="absolute"
        top="5"
        left="5"
        name={user.email ?? ''}
        src={user.photoURL ?? ''}
      />
    )
  }

  return null
}

export default UserIcon
