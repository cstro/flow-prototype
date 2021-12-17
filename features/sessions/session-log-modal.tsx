import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import useSessionStore from '../../store'

function SessionLogModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { sessions } = useSessionStore()

  const displaySessions = Object.values(sessions).sort((a, b) => {
    return a.from > b.from ? 1 : -1
  })

  return (
    <>
      <Button onClick={onOpen}>View session log</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <pre>{JSON.stringify(displaySessions, null, 2)}</pre>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SessionLogModal
