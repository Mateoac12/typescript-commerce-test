import { ChakraProvider, Container } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={'container.lg'} minHeight={'100vh'} p={0}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
