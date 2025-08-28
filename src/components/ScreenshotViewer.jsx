import React from 'react'

export default function ScreenshotViewer({ imageUrl, loading, onDownload }) {
  if (loading) return <div className="card"><div className="skeleton" /></div>
  if (!imageUrl) return null
  return (
    <div className="card preview">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
        <h3 style={{margin:'6px 0'}}>Preview</h3>
        <div className="footer">
          <a className="link" href={imageUrl} target="_blank" rel="noreferrer">Open raw image</a>
          <button className="button" onClick={onDownload}>Download</button>
        </div>
      </div>
      <img src={imageUrl} alt="Website screenshot" />
    </div>
  )
}
