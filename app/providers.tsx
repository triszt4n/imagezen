import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        themes={['dark', 'light']}
        attribute="class"
        defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}
