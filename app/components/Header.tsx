'use client'

import React, { useState } from 'react'
import Cookies from 'js-cookie'

export interface HeaderProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const NAV_ITEMS = [
  { label: 'Home',        href: '/'            },
  { label: 'Escape Room', href: '/escape-room' },
  { label: 'Coding Races',href: '/coding-races'},
  { label: 'Court Room',  href: '/court-room'  },
  { label: 'About',       href: '/about'       },
]

export default function Header({ theme, setTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeHref = Cookies.get('activeTab') || '/'

  function handleNavClick(href: string) {
    Cookies.set('activeTab', href, { expires: 7 })
    setMenuOpen(false)
  }

  const isLight = theme === 'light'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
        background: isLight ? '#fff' : '#222',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
    >
      {}
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: isLight ? '#222' : '#f5f5f5' }}>
        22586673 – Ferlian Risley Effendi
      </div>

      {}
      <nav
        aria-label="Main navigation"
        style={{
          display: 'flex',
          gap: '1.5rem',
        }}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={() => handleNavClick(href)}
            style={{
              fontWeight: activeHref === href ? 'bold' : 'normal',
              color: isLight ? '#333' : '#f5f5f5',
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          aria-label="Toggle dark/light theme"
          style={{
            fontSize: '1.2rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: isLight ? '#000' : '#fff',
          }}
        >
          {isLight ? '🌙' : '☀️'}
        </button>

        {}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            fontSize: '1.8rem',
            background: 'transparent',
            border: '1px solid red',
            borderRadius: '4px',
            padding: '2px 6px',
            cursor: 'pointer',
            color: isLight ? '#000' : '#fff',
          }}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: isLight ? '#fff' : '#333',
            width: '200px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            borderRadius: 4,
            padding: '1rem',
          }}
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              style={{
                display: 'block',
                margin: '0.5rem 0',
                color: isLight ? '#000' : '#fff',
                fontWeight: activeHref === href ? 'bold' : 'normal',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
