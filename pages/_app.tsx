import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const colors = {
  background: {
    light: '#F5F2ED',
    dark: '#022032',
  },
  blue: {
    500: '#126BFB',
  },
  pink: {
    100: '#FBADC5',
  },
}

const styles = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  global: (props: any) => ({
    'html, body': {
      fontSize: 'sm',
      fontFamily: "'Rubik', sans-serif",
      backgroundColor:
        props.colorMode === 'dark' ? 'background.dark' : 'background.light',
      height: '100vh',
    },
  }),
}

const theme = extendTheme({ colors, styles })

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
