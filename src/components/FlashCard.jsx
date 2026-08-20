import { useEffect, useRef, useState } from 'react'

function FlashCard({ study, isFavorite, onToggleFavorite, isFlipped, onFlip }) {
  if (!study) return null

  const isStudy = study.type === 'study' || !study.type
  const isQrLink = study.type === 'qr-link'
  const isLinkOnly = study.type === 'link'

  const contentRef = useRef(null)
  const [needsScroll, setNeedsScroll] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current
      if (!el) return

      setNeedsScroll(el.scrollHeight > el.clientHeight + 2)
    }

    checkOverflow()

    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [study, isFlipped])

  if (isQrLink) {
    return (
      <section className="cardArea" aria-live="polite">
        <div className="staticCard">
          <article className="cardFace resourceCard">
            <div className="cardTopRow">
              <span className="sideLabel">Reference resource</span>

              <button
                type="button"
                className={`favoriteButton ${isFavorite ? 'selected' : ''}`}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            <div className="resourceContent">
              <h2>{study.title}</h2>

              {study.subtitle && (
                <h3 className="studySubtitle">{study.subtitle}</h3>
              )}

              {study.journal && (
                <p className="journal">{study.journal}</p>
              )}

              <div className="qrFrame">
                <img src={study.qr} alt={`QR code for ${study.title}`} />
              </div>

              <p className="resourceHint">
                Scan the QR code or open the file directly.
              </p>
            </div>

            <a
              className="resourceLinkButton"
              href={study.url}
              target="_blank"
              rel="noreferrer"
            >
              {study.linkLabel || 'Open resource'}
            </a>
          </article>
        </div>
      </section>
    )
  }

  if (isLinkOnly) {
    return (
      <section className="cardArea" aria-live="polite">
        <div className="staticCard">
          <article className="cardFace resourceCard">
            <div className="cardTopRow">
              <span className="sideLabel">Reference resource</span>

              <button
                type="button"
                className={`favoriteButton ${isFavorite ? 'selected' : ''}`}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            <div className="resourceContent linkOnlyContent">
              <h2>{study.title}</h2>

              {study.subtitle && (
                <h3 className="studySubtitle">{study.subtitle}</h3>
              )}

              {study.journal && (
                <p className="journal">{study.journal}</p>
              )}

              <p className="resourceHint">
                Open this resource directly on your device.
              </p>
            </div>

            <a
              className="resourceLinkButton"
              href={study.url}
              target="_blank"
              rel="noreferrer"
            >
              {study.linkLabel || 'Open resource'}
            </a>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="cardArea" aria-live="polite">
      <div className={`flipCard ${isFlipped ? 'isFlipped' : ''}`}>
        <div className="flipCardInner">

          <article className="cardFace cardFront">
            <div className="cardTopRow">
              <span className="sideLabel">Study summary</span>

              <button
                type="button"
                className={`favoriteButton ${isFavorite ? 'selected' : ''}`}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            <div className="cardContent" ref={contentRef}>
              <h2>{study.title}</h2>

              {study.subtitle && (
                <h3 className="studySubtitle">{study.subtitle}</h3>
              )}

              {study.journal && (
                <p className="journal">{study.journal}</p>
              )}

              <ul>
                {study.bullets.map((bullet, index) => (
                  <li key={`${study.id}-${index}`}>{bullet}</li>
                ))}
              </ul>
            </div>

            {needsScroll && (
              <div className="scrollHint">
                <span>Scroll for more</span>
                <span className="scrollArrow" aria-hidden="true">↓</span>
              </div>
            )}

            <button type="button" className="flipButton" onClick={onFlip}>
              Show QR code <span aria-hidden="true">↻</span>
            </button>
          </article>

          <article className="cardFace cardBack">
            <div className="cardTopRow">
              <span className="sideLabel">Scan study</span>

              <button
                type="button"
                className={`favoriteButton ${isFavorite ? 'selected' : ''}`}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            <div className="qrContent">
              <h2>{study.title}</h2>

              {study.subtitle && (
                <h3 className="studySubtitle">{study.subtitle}</h3>
              )}

              {study.journal && (
                <p className="journal">{study.journal}</p>
              )}

              <div className="qrFrame">
                <img src={study.qr} alt={`QR code for ${study.title}`} />
              </div>

              <p>Point another phone's camera at the QR code.</p>
            </div>

            <button type="button" className="flipButton secondary" onClick={onFlip}>
              Back to summary <span aria-hidden="true">↻</span>
            </button>
          </article>

        </div>
      </div>
    </section>
  )
}

export default FlashCard