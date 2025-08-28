import React from 'react'
import UrlForm from './components/UrlForm.jsx'
import Controls from './components/Controls.jsx'
import ScreenshotViewer from './components/ScreenshotViewer.jsx'
import { buildScreenshotUrl, normalizeUrl } from './lib/screenshotClient.js'

export default function App() {
  const [url, setUrl] = React.useState('https://screenshotmachine.com')
  const [format, setFormat] = React.useState('png')
  const [device, setDevice] = React.useState('desktop')
  const [imageUrl, setImageUrl] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [toast, setToast] = React.useState('')

  const normalized = React.useMemo(() => normalizeUrl(url), [url])

  const deviceToDimension = React.useMemo(() => ({
    mobile: '390x844', // iPhone-like
    tablet: '820x1180', // iPad-like
    desktop: '1366x768'
  }), [])

  async function capture() {
    setError('')
    if (!normalized) {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }
    setLoading(true)
    try {
      const apiUrl = buildScreenshotUrl({ url: normalized, format, dimension: deviceToDimension[device] || '1366x768' })
      setImageUrl(apiUrl)
      localStorage.setItem('ss_last', JSON.stringify({ url, format, device }))
      setToast('Screenshot ready')
      setTimeout(()=>setToast(''), 2000)
    } catch (e) {
      setError(e?.message || 'Failed to capture screenshot.')
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!imageUrl) return
    try {
      const u = new URL(normalized)
      const ts = new Date().toISOString().replace(/[:.]/g,'-')
      const filename = `${u.hostname}-${ts}.${format}`
      const a = document.createElement('a')
      a.href = imageUrl
      a.download = filename
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setToast('Downloading…')
      setTimeout(()=>setToast(''), 1500)
    } catch {
      window.open(imageUrl, '_blank')
    }
  }

  React.useEffect(() => {
    const saved = localStorage.getItem('ss_last')
    if (saved) {
      try {
        const s = JSON.parse(saved)
        if (s.url) setUrl(s.url)
        if (s.format) setFormat(s.format)
        if (s.device) setDevice(s.device)
      } catch {}
    }
  }, [])

  return (
    <>
      <div className="canvas" aria-hidden="true" />
      <div className="container">
        <header className="header">
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <div>
              <div className="title">SnapShot</div>
              <div className="helper">URL → Image • {deviceToDimension[device] || '1366×768'}</div>
            </div>
          </div>
          <span className="badge">No server • Clean UI</span>
        </header>

        <UrlForm url={url} setUrl={setUrl} onSubmit={capture} />

        <Controls
          format={format}
          setFormat={setFormat}
          device={device}
          setDevice={setDevice}
          loading={loading}
          onCapture={capture}
        />

        {error && (
          <div className="card" style={{borderColor:'rgba(255,107,107,0.35)'}}>
            <p style={{color:'var(--danger)', margin:0}}>{error}</p>
            <p className="helper" style={{marginTop:8}}>
              Check the URL or try again later (API limits may apply).
            </p>
          </div>
        )}

        <ScreenshotViewer imageUrl={imageUrl} loading={loading} onDownload={handleDownload} />

        <footer className="footer">
          <a className="link" href="https://screenshotmachine.com" target="_blank" rel="noreferrer">
            Powered by ScreenshotMachine
          </a>
          <span className="helper">Looks native • Not templated</span>
        </footer>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  )
}
