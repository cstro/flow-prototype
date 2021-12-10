import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  background: {
    light: '#F5F2ED',
    dark: '#022032',
  },
  blue: {
    500: '#126BFB',
  },
  pink: {
    100: "#FBADC5",
  }
}

const styles = {
  global: (props: any) => ({
    'html, body': {
      fontSize: 'sm',
      fontFamily: "'Rubik', sans-serif",
      backgroundColor: props.colorMode === 'dark' ? 'background.dark' : 'background.light',
      height: '100vh',
    },
  }),
}

const theme = extendTheme({ colors, styles })

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}


export default App
