import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import ContentState from '../components/ContentState'
import MovieGridSkeleton from '../components/MovieGridSkeleton'
import { getBrowseMovies, getGenres } from '../services/tmdb'

function BrowsePage() {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '')
  const [yearFilter, setYearFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let ignore = false

    getGenres()
      .then((movieGenres) => {
        if (!ignore) setGenres(movieGenres)
      })
      .catch(() => {})

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    const timer = setTimeout(() => {
      setLoading(true)
      setError('')

      async function loadMovies() {
        try {
          const results = await getBrowseMovies({
            query: searchTerm,
            genreId: selectedGenre,
            year: yearFilter,
          })
          if (!ignore) setMovies(results)
        } catch (requestError) {
          if (!ignore) setError(requestError.message)
        } finally {
          if (!ignore) setLoading(false)
        }
      }

      loadMovies()
    }, 300)

    return () => {
      ignore = true
      clearTimeout(timer)
    }
  }, [searchTerm, selectedGenre, yearFilter, retryCount])

  return (
    <main className="page browse-page container">
      <section className="section-header top-header">
        <div>
          <p className="eyebrow">Browse the library</p>
          <h1>Find your next watch</h1>
        </div>
      </section>

      <section className="filters-panel">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
            setLoading(true)
            setError('')
          }}
          placeholder="Search movies"
          aria-label="Search movies"
        />

        <select
          value={selectedGenre}
          onChange={(event) => {
            setSelectedGenre(event.target.value)
            setLoading(true)
            setError('')
          }}
          aria-label="Filter by genre"
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={yearFilter}
          onChange={(event) => {
            setYearFilter(event.target.value)
            setLoading(true)
            setError('')
          }}
          min="1874"
          max={new Date().getFullYear()}
          placeholder="Release year"
          aria-label="Filter by release year"
        />
      </section>

      {loading ? (
        <MovieGridSkeleton count={6} className="browse-grid" />
      ) : error || movies.length === 0 ? (
        <section className="movie-grid browse-grid">
          <ContentState
            error={error}
            empty={!error && movies.length === 0}
            emptyMessage={searchTerm ? 'No movies matched that search. Try another title.' : 'No movies match these filters.'}
            onRetry={() => setRetryCount((count) => count + 1)}
          />
        </section>
      ) : (
        <section className="movie-grid browse-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      )}
    </main>
  )
}

export default BrowsePage
