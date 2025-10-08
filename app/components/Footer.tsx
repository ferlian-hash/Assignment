'use client'

import React from 'react'

export interface FooterProps {
  studentNumber: string
  studentName: string
}

export default function Footer({ studentNumber, studentName }: FooterProps) {
  return (
    <footer
      style={{
        marginTop: '2rem',
        padding: '1rem',
        borderTop: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.9rem',
      }}
    >
      &copy; {new Date().getFullYear()} {studentName}, {studentNumber}
    </footer>
  )
}
