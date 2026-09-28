import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContentState from '../components/ContentState'
import { getGenres } from '../services/tmdb'

function GenresPage() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let ignore = false

    getGenres()
      .then((movieGenres) => {
        if (!ignore) setGenres(movieGenres)
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [retryCount])

  const retryLoading = () => {
    setLoading(true)
    setError('')
    setRetryCount((count) => count + 1)
  }

  return (
    <main className="page container genres-page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Browse by mood</p>
          <h1>Genres</h1>
        </div>
      </section>

      <div className="genre-grid">
        {loading || error || genres.length === 0 ? (
          <ContentState
            loading={loading}
            error={error}
            empty={!loading && !error && genres.length === 0}
            emptyMessage="Movie genres are not available right now."
            loadingMessage="Loading genres..."
            onRetry={retryLoading}
          />
        ) : (
          genres.map((genre) => (
            <Link key={genre.id} to={`/browse?genre=${genre.id}`} className="genre-card">
              <span>{genre.name}</span>
              <strong>Explore movies</strong>
            </Link>
          ))
        )}
      </div>
    </main>
  )
}

export default GenresPage
