'use client'

import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: theme === 'light' ? '#fff' : '#111',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <Header theme={theme} setTheme={setTheme} />

        <main>{children}</main>

        <Footer studentNumber="22586673" studentName="Ferlian Risley effendi" />
      </body>
    </html>
  )
}
