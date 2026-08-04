function Navigation({ current, total, onPrevious, onNext, disabled }) {
  return (
    <nav className="navigation" aria-label="Study navigation">
      <button type="button" onClick={onPrevious} disabled={disabled} aria-label="Previous study">
        ‹
      </button>
      <div className="progressWrap">
        <span>{total ? `${current + 1} / ${total}` : '0 / 0'}</span>
        <div className="progressTrack" aria-hidden="true">
          <div
            className="progressFill"
            style={{ width: total ? `${((current + 1) / total) * 100}%` : '0%' }}
          />
        </div>
      </div>
      <button type="button" onClick={onNext} disabled={disabled} aria-label="Next study">
        ›
      </button>
    </nav>
  )
}

export default Navigation
