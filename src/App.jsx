import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FlashCard from './components/FlashCard'
import Navigation from './components/Navigation'
import { studies } from './data/studies'

const FAVORITES_KEY = 'research-flashcards-favorites'
const LAST_STUDY_KEY = 'research-flashcards-last-study'

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? []
  } catch {
    return []
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [favoriteOnly, setFavoriteOnly] = useState(false)
  const [favorites, setFavorites] = useState(readFavorites)
  const [currentId, setCurrentId] = useState(
    () => localStorage.getItem(LAST_STUDY_KEY) || studies[0]?.id || ''
  )
  const [isFlipped, setIsFlipped] = useState(false)

  const filteredStudies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return studies.filter((study) => {
      if (favoriteOnly && !favorites.includes(study.id)) return false
      if (!normalizedQuery) return true

      const searchableText = [study.title, study.journal, ...study.bullets]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [query, favoriteOnly, favorites])

  const currentIndex = Math.max(
    0,
    filteredStudies.findIndex((study) => study.id === currentId)
  )
  const currentStudy = filteredStudies[currentIndex] || null

  useEffect(() => {
    if (currentStudy && currentStudy.id !== currentId) {
      setCurrentId(currentStudy.id)
    }
  }, [currentStudy, currentId])

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (currentStudy) localStorage.setItem(LAST_STUDY_KEY, currentStudy.id)
  }, [currentStudy])

  useEffect(() => {
    setIsFlipped(false)
  }, [currentId, query, favoriteOnly])

  function toggleFavorite() {
    if (!currentStudy) return
    setFavorites((existing) =>
      existing.includes(currentStudy.id)
        ? existing.filter((id) => id !== currentStudy.id)
        : [...existing, currentStudy.id]
    )
  }

  function move(direction) {
    if (filteredStudies.length < 2) return
    const nextIndex = (currentIndex + direction + filteredStudies.length) % filteredStudies.length
    setCurrentId(filteredStudies[nextIndex].id)
  }

  return (
    <main className="appShell">
      <div className="app">
        <Header
          favoriteOnly={favoriteOnly}
          favoriteCount={favorites.length}
          onToggleFavoriteOnly={() => setFavoriteOnly((value) => !value)}
        />
        <SearchBar value={query} onChange={setQuery} />

        {currentStudy ? (
          <>
            <FlashCard
              study={currentStudy}
              isFavorite={favorites.includes(currentStudy.id)}
              onToggleFavorite={toggleFavorite}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((value) => !value)}
            />
            <Navigation
              current={currentIndex}
              total={filteredStudies.length}
              onPrevious={() => move(-1)}
              onNext={() => move(1)}
              disabled={filteredStudies.length < 2}
            />
          </>
        ) : (
          <section className="emptyState">
            <h2>No studies found</h2>
            <p>Clear the search or turn off the favorites filter.</p>
          </section>
        )}

        <p className="offlineNote">Available offline after the first successful visit.</p>
      </div>
    </main>
  )
}

export default App
