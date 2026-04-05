import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KreaOne — Research Ops Platform',
  description: 'End-to-end market research operations: online studies, CATI, vendor supply & panel management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
