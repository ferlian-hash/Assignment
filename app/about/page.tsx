'use client'

import React from 'react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4f8, #e8f0ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          width: '100%',
          maxWidth: '700px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#0070f3',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          About This Site
        </h1>

        <p style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#333' }}>
          <strong>Name:</strong> [Ferlian Risley Effndi]
        </p>
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#333' }}>
          <strong>Student ID:</strong> [22586673]
        </p>

        <div
          style={{
            textAlign: 'center',
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', color: '#444' }}>Demo Video</h2>
          <video
            controls
            style={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
            aria-label="How to use this website"
            preload="metadata"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            href="/"
            style={{
              background: '#0070f3',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background 0.3s ease, transform 0.2s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = '#0056b3')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = '#0070f3')
            }
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
