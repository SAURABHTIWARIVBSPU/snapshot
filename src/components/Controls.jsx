import React from 'react'

export default function Controls({ format, setFormat, device, setDevice, loading, onCapture }) {
  return (
    <div className="card">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:12, alignItems:'end'}}>
        <div>
          <label className="helper">Device</label>
          <select value={device} onChange={(e) => setDevice(e.target.value)}>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>
        <div>
          <label className="helper">Image format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </div>
        <button className="button" disabled={loading} onClick={onCapture}>
          {loading ? 'Capturing…' : 'Capture Screenshot'}
        </button>
      </div>
    </div>
  )
}
