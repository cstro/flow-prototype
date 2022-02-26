import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

interface LinkProps extends HTMLChakraProps<'a'> {
  href: string
}

const Link = (props: LinkProps) => {
  const { href, ...aProps } = props

  return (
    <NextLink href={href} passHref>
      <chakra.a
        marginStart="1"
        color={useColorModeValue('blue.500', 'blue.200')}
        _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
        display={{ base: 'block', sm: 'inline' }}
        {...aProps}
      />
    </NextLink>
  )
}

export default Link
