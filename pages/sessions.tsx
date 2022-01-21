import {
  Container,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { format, getUnixTime, isSameDay } from 'date-fns'
import type { NextPage } from 'next'
import { Link } from '../components/link'
import useAllSessions from '../hooks/useAllSessions'
import { Session } from '../types'

const Session: NextPage = () => {
  const { isLoading, sessions } = useAllSessions()

  if (isLoading) {
    return <div>Fetching your session history...</div>
  }

  if (!sessions) {
    return <div>Failed to load sessions!</div>
  }

  const groupedSessions = groupSessionsByDate(sessions)

  return (
    <Container>
      <Stack spacing="8">
        <Link marginTop="10" href="/">
          Back
        </Link>

        <Heading>My Sessions</Heading>

        {groupedSessions.map((group) => (
          <Stack spacing="4" key={getUnixTime(group.day)}>
            <Heading size="md">
              {format(group.day, 'eeee co LLLL yyyy')}
            </Heading>
            <Table variant="simple" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Session Type</Th>
                  <Th>Started At</Th>
                  <Th>Length</Th>
                </Tr>
              </Thead>
              <Tbody>
                {group.sessions.map((session) => (
                  <Tr key={session.id}>
                    <Td>{session.type}</Td>
                    <Td>{format(session.createdAt, 'kk:mm')}</Td>
                    <Td>{session.duration} minutes</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}

const groupSessionsByDate = (sessions: Session[]) => {
  const groups = []
  let prevDate

  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i]

    if (prevDate && isSameDay(session.createdAt, prevDate)) {
      // Add to most recent group
      const mostRecentGroup = groups[groups.length - 1]
      mostRecentGroup.sessions.push(session)
    } else {
      // Create a new group
      const newGroup = {
        day: session.createdAt,
        sessions: [session],
      }

      groups.push(newGroup)
    }

    prevDate = session.createdAt
  }

  return groups
}

export default Session
