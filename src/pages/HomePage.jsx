import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import AIChatPanel from '../components/AIChatPanel'
import ContentState from '../components/ContentState'
import LoadingSpinner from '../components/LoadingSpinner'
import MovieGridSkeleton from '../components/MovieGridSkeleton'
import { getPopularMovies, getTrendingMovies } from '../services/tmdb'

const examplePrompts = [
  'Something funny',
  'A scary movie without too much gore',
  'Something like Inception',
  'A movie to watch with my family',
]

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let ignore = false

    async function loadMovies() {
      try {
        const [trending, popular] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
        ])

        if (!ignore) {
          setTrendingMovies(trending)
          setPopularMovies(popular)
        }
      } catch (requestError) {
        if (!ignore) setError(requestError.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadMovies()

    return () => {
      ignore = true
    }
  }, [retryCount])

  const retryLoading = () => {
    setLoading(true)
    setError('')
    setRetryCount((count) => count + 1)
  }

  const heroMovie = trendingMovies[0]

  return (
    <main className="page home-page">
      <section className="hero-section container">
        <div className="hero-copy">
          <p className="eyebrow">Movie discovery, made simple</p>
          <h1>Find Your Next Favorite Movie</h1>
          <p className="hero-description">
            Tell us what you are in the mood for and let AI find the perfect movie for you.
          </p>

          <AIChatPanel />

          <div className="prompt-chips">
            {examplePrompts.map((prompt) => (
              <button key={prompt} type="button" className="prompt-chip">
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {heroMovie ? (
          <div className="hero-poster">
            {heroMovie.backdrop && <img src={heroMovie.backdrop} alt={heroMovie.title} />}
            <div className="hero-poster__card">
              <span>Trending now</span>
              <strong>{heroMovie.title}</strong>
              <small>{heroMovie.genres.join(' • ')}</small>
            </div>
          </div>
        ) : loading ? (
          <LoadingSpinner
            label="Finding your featured movie"
            className="hero-loading"
          />
        ) : error ? (
          <ContentState error={error} onRetry={retryLoading} />
        ) : (
          <ContentState empty emptyMessage="No featured movie is available right now." />
        )}
      </section>

      <section className="content-section container">
        <div className="section-header">
          <h2>Trending movies</h2>
          <Link to="/browse">View all</Link>
        </div>

        {loading ? (
          <MovieGridSkeleton count={3} className="three-up" />
        ) : error ? null : trendingMovies.length ? (
          <div className="movie-grid three-up">
            {trendingMovies.slice(0, 3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <ContentState empty emptyMessage="No films are trending right now." />
        )}
      </section>

      <section className="content-section container">
        <div className="section-header">
          <h2>Popular movies</h2>
        </div>

        {loading ? (
          <MovieGridSkeleton count={4} className="four-up" />
        ) : error ? null : popularMovies.length ? (
          <div className="movie-grid four-up">
            {popularMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <ContentState empty emptyMessage="No popular films are available right now." />
        )}
      </section>
    </main>
  )
}

export default HomePage
