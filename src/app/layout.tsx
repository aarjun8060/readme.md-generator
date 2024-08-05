import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnarToaster } from '@/components/ui/sonner'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'README.md',
  description: 'Ever wondered what happens when a coder meets a README.md file? Sparks fly, and magic happens! 💥✨',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
            {children}
            <Toaster />
          <SonnarToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
