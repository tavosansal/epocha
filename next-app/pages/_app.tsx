import '../styles/globals.css'
import { ConvertersProvider } from '../context/ConvertersContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvertersProvider>
      <Component {...pageProps} />
    </ConvertersProvider>
  )
}
