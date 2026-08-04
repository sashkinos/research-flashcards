function FlashCard({ study, isFavorite, onToggleFavorite, isFlipped, onFlip }) {
  if (!study) return null

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

            <div className="cardContent">
              <h2>{study.title}</h2>
              <p className="journal">{study.journal}</p>
              <ul>
                {study.bullets.map((bullet, index) => (
                  <li key={`${study.id}-${index}`}>{bullet}</li>
                ))}
              </ul>
            </div>

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
