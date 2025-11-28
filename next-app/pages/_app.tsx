import '../styles/globals.css';
import { ConvertersProvider } from '../context/ConvertersContext';
import { ThemeProvider } from '@/components/theme-provider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConvertersProvider>
        <Component {...pageProps} />
      </ConvertersProvider>
    </ThemeProvider>
  );
}
