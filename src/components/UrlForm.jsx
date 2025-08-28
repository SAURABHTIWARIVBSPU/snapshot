import React from 'react'

export default function UrlForm({ url, setUrl, onSubmit }) {
  return (
    <form className="card" onSubmit={(e)=>{e.preventDefault(); onSubmit?.()}}>
      <label htmlFor="site-url" className="helper">Website URL</label>
      <input
        id="site-url"
        className="input"
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        autoComplete="off"
        spellCheck="false"
        aria-label="Website URL"
      />
      <div className="controls">
        <div className="helper">Press <span className="kbd">Enter</span> to capture</div>
        <button className="button" type="submit">Capture Screenshot</button>
      </div>
    </form>
  )
}
