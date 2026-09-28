import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AIChatPanel from '../components/AIChatPanel'
import ContentState from '../components/ContentState'
import MovieDetailsSkeleton from '../components/MovieDetailsSkeleton'
import { getMovieDetails } from '../services/tmdb'

function MovieDetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let ignore = false

    async function loadMovie() {
      try {
        const details = await getMovieDetails(id)
        if (!ignore) setMovie(details)
      } catch (requestError) {
        if (!ignore) setError({ id, message: requestError.message })
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadMovie()

    return () => {
      ignore = true
    }
  }, [id, retryCount])

  const visibleError = error?.id === id ? error.message : ''
  const isLoading = loading || (!visibleError && movie?.id !== id)
  const retryLoading = () => {
    setLoading(true)
    setError(null)
    setRetryCount((count) => count + 1)
  }

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (visibleError || !movie) {
    return (
      <main className="page container not-found">
        <ContentState
          error={visibleError}
          empty={!visibleError && !movie}
          emptyMessage="This movie could not be found."
          loadingMessage="Loading movie details..."
          onRetry={retryLoading}
        />
        <Link to="/browse" className="primary-button">
          Back to Browse
        </Link>
      </main>
    )
  }

  return (
    <main className="page movie-page">
      <section
        className="movie-hero"
        style={{
          backgroundImage: movie.backdrop
            ? `linear-gradient(rgba(8, 10, 15, 0.7), rgba(8, 10, 15, 0.9)), url(${movie.backdrop})`
            : 'linear-gradient(rgba(8, 10, 15, 0.7), rgba(8, 10, 15, 0.9))',
        }}
      >
        <div className="container movie-hero__content">
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="movie-detail-poster" />
          ) : (
            <div className="movie-detail-poster poster-placeholder">{movie.title}</div>
          )}

          <div className="movie-hero__info">
            <p className="eyebrow">Now showing</p>
            <h1>{movie.title}</h1>

            <div className="movie-meta">
              <span>{movie.releaseDate || 'Release date unavailable'}</span>
              <span>{movie.runtime || 'Runtime unavailable'}</span>
              <span>⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
            </div>

            <div className="genre-list">
              {movie.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>

            <p className="overview">{movie.overview || 'No overview is available for this movie.'}</p>
          </div>
        </div>
      </section>

      <section className="container movie-details-grid">
        <div className="movie-details-card">
          <h2>Movie info</h2>
          <ul>
            <li>
              <strong>Director:</strong> {movie.director || 'Not available'}
            </li>
            <li>
              <strong>Cast:</strong> {movie.cast.length ? movie.cast.join(', ') : 'Not available'}
            </li>
            <li>
              <strong>Popularity:</strong> {movie.popularity.toFixed(1)}
            </li>
          </ul>
        </div>

        <div className="movie-details-card">
          <h2>Movie overview</h2>
          <p>{movie.overview || 'No overview is available for this movie.'}</p>
        </div>
      </section>

      <section className="container movie-ai-section">
        <AIChatPanel movie={movie} />
      </section>
    </main>
  )
}

export default MovieDetailPage
