import { getAuth } from 'firebase/auth'
import { useAuthState as baseUseAuthState } from 'react-firebase-hooks/auth'
import firebaseApp from './app'

const auth = getAuth(firebaseApp)

export const useAuthState = () => baseUseAuthState(auth)

export default auth
