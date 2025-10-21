declare module 'next-themes' {
  export function useTheme(): { theme: string | undefined; setTheme: (t: string) => void }
  export const ThemeProvider: any
}
