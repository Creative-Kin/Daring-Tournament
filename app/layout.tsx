import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daring Tournament',
  description: 'Tournament Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  )
}
