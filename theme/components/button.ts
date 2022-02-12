import type { ComponentStyleConfig } from '@chakra-ui/theme'

const Button: ComponentStyleConfig = {
  baseStyle: {
    width: '244px',
    fontSize: '14px',
    py: 7,
    fontWeight: 500,
    letterSpacing: '0.5px',
    borderRadius: '34px',
  },
  variants: {
    outline: ({ colorScheme }) => ({
      bg: `gray.500`,
      _hover: {
        bg: `gray.600`,
      },
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#F5F2ED',
      color: colorScheme === 'gray' ? 'white' : `${colorScheme}.500`,
    }),
    solid: ({ colorScheme }) => ({
      bg: `${colorScheme}.500`,
      color: 'white',
      _hover: {
        bg: `${colorScheme}.600`,
      },
    }),
  },
  defaultProps: {
    colorScheme: 'blue',
    variant: 'solid',
  },
}

export default Button
