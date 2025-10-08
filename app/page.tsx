'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export default function HomePage() {
  const [tabs, setTabs] = useState<{ title: string; content: string }[]>([
    { title: 'Tab 1', content: 'Content for Tab 1' },
  ])
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [clearAfterGenerate, setClearAfterGenerate] = useState<boolean>(false)

  const addTab = () => {
    if (tabs.length < 15) {
      setTabs([
        ...tabs,
        { title: `Tab ${tabs.length + 1}`, content: `Content for Tab ${tabs.length + 1}` },
      ])
    }
  }

  const removeTab = (index: number) => {
    setTabs(tabs.filter((_, i) => i !== index))
  }

  const updateTab = (index: number, field: 'title' | 'content', value: string) => {
    const newTabs = [...tabs]
    newTabs[index][field] = value
    setTabs(newTabs)
  }

  const generateCode = () => {
    const buttons = tabs
      .map(
        (tab, i) =>
          `<button onclick="showTab(${i})" style="padding:0.5rem 1rem;margin:0 5px;border:1px solid #007bff;background:#007bff;color:#fff;cursor:pointer;">${tab.title}</button>`
      )
      .join('\n')

    const contents = tabs
      .map(
        (tab, i) =>
          `<div class="tab-content" style="display:${
            i === 0 ? 'block' : 'none'
          };padding:1rem;border:1px solid #ccc;margin-top:10px;border-radius:5px;">
  ${tab.content}
</div>`
      )
      .join('\n')

    const script = `
<script>
window.showTab = function(index) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach((c, i) => {
    c.style.display = i === index ? 'block' : 'none';
  });
}
</script>`

    const fullCode = `
<div class="tabs" style="margin-bottom:1rem;">
  ${buttons}
</div>

${contents}

${script}
    `

    setGeneratedCode(fullCode.trim())

    if (clearAfterGenerate) {
      setTabs([])
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('✅ Code copied to clipboard!')
  }

  const downloadHTML = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'tabs.html'
    link.click()
  }

  return (
    <main style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      {/* ✅ Navigation Section */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link
          href="/about"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Go to About Page →
        </Link>
      </nav>

      <h1 style={{ marginBottom: '1rem' }}>Tab Generator</h1>

      <button
        onClick={addTab}
        disabled={tabs.length >= 15}
        style={{
          margin: '0.5rem 0',
          padding: '0.5rem 1rem',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        + Add Tab ({tabs.length}/15)
      </button>

      {tabs.map((tab, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          {/* Input Title */}
          <input
            type="text"
            value={tab.title}
            onChange={(e) => updateTab(i, 'title', e.target.value)}
            placeholder="Tab name"
            style={{
              padding: '0.5rem',
              width: '200px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '0.5rem',
            }}
          />

          {/* Input Content */}
          <input
            type="text"
            value={tab.content}
            onChange={(e) => updateTab(i, 'content', e.target.value)}
            placeholder="Tab content"
            style={{
              padding: '0.5rem',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '0.5rem',
            }}
          />

          <button
            onClick={() => removeTab(i)}
            style={{
              padding: '0.5rem 1rem',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={clearAfterGenerate}
          onChange={(e) => setClearAfterGenerate(e.target.checked)}
        />
        Clear tabs after generate
      </label>

      <button
        onClick={generateCode}
        style={{
          display: 'block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#0275d8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Generate Code
      </button>

      {generatedCode && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Generated Code:</h2>
          <textarea
            readOnly
            value={generatedCode}
            rows={Math.min(20, generatedCode.split('\n').length)}
            style={{
              width: '100%',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          />

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={copyCode}
              style={{
                padding: '0.5rem 1rem',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Copy Code
            </button>
            <button
              onClick={downloadHTML}
              style={{
                padding: '0.5rem 1rem',
                background: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Download .html
            </button>
          </div>
        </>
      )}
    </main>
  )
}
