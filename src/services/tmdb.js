const API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

let genresRequest

async function requestTmdb(path, parameters = {}) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  if (!apiKey) {
    throw new Error(
      'TMDB API key is missing. Add VITE_TMDB_API_KEY to .env.local and restart the app.',
    )
  }

  const query = new URLSearchParams({ api_key: apiKey, language: 'en-US' })

  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })

  const response = await fetch(`${API_BASE_URL}${path}?${query}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'TMDB could not load movie data.')
  }

  return data
}

export function getGenres() {
  if (!genresRequest) {
    genresRequest = requestTmdb('/genre/movie/list')
      .then((data) => data.genres || [])
      .catch((error) => {
        genresRequest = undefined
        throw error
      })
  }

  return genresRequest
}

function getImageUrl(path, size) {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null
}

function getYear(releaseDate) {
  return releaseDate ? Number(releaseDate.slice(0, 4)) || null : null
}

function mapMovie(movie, genresById = new Map()) {
  const movieGenres = movie.genres
    ? movie.genres.map((genre) => genre.name)
    : (movie.genre_ids || []).map((id) => genresById.get(id)).filter(Boolean)

  return {
    id: String(movie.id),
    title: movie.title || 'Untitled movie',
    year: getYear(movie.release_date),
    releaseDate: movie.release_date || null,
    rating: Number(movie.vote_average) || 0,
    runtime: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null,
    genres: movieGenres,
    director:
      movie.credits?.crew?.find((person) => person.job === 'Director')?.name || null,
    cast: (movie.credits?.cast || []).slice(0, 10).map((person) => person.name),
    popularity: Number(movie.popularity) || 0,
    poster: getImageUrl(movie.poster_path, 'w500'),
    backdrop: getImageUrl(movie.backdrop_path, 'original'),
    overview: movie.overview || '',
    genreIds: movie.genre_ids || (movie.genres || []).map((genre) => genre.id),
  }
}

async function mapMovieList(results) {
  const genres = await getGenres()
  const genresById = new Map(genres.map((genre) => [genre.id, genre.name]))

  return (results || []).map((movie) => mapMovie(movie, genresById))
}

export async function getTrendingMovies() {
  const data = await requestTmdb('/trending/movie/week')
  return mapMovieList(data.results)
}

export async function getPopularMovies() {
  const data = await requestTmdb('/movie/popular')
  return mapMovieList(data.results)
}

export async function getBrowseMovies({ query, genreId, year }) {
  const search = query.trim()
  const parameters = search
    ? { query: search, year }
    : {
        sort_by: 'popularity.desc',
        with_genres: genreId,
        primary_release_year: year,
      }
  const endpoint = search ? '/search/movie' : '/discover/movie'
  const data = await requestTmdb(endpoint, parameters)
  let movies = await mapMovieList(data.results)

  if (search && genreId) {
    movies = movies.filter((movie) => movie.genreIds.includes(Number(genreId)))
  }

  return movies
}

export async function getMovieDetails(id) {
  const [data, genres] = await Promise.all([
    requestTmdb(`/movie/${id}`, { append_to_response: 'credits' }),
    getGenres(),
  ])
  const genresById = new Map(genres.map((genre) => [genre.id, genre.name]))

  return mapMovie(data, genresById)
}
