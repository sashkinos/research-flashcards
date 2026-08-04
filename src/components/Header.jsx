function Header({ favoriteOnly, onToggleFavoriteOnly, favoriteCount }) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Clinical Research Library</p>
        <h1>Research Flash Cards</h1>
      </div>
      <button
        type="button"
        className={`filterButton ${favoriteOnly ? 'active' : ''}`}
        onClick={onToggleFavoriteOnly}
        aria-pressed={favoriteOnly}
      >
        ★ {favoriteCount}
      </button>
    </header>
  )
}

export default Header
