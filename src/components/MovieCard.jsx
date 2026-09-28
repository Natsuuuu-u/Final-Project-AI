import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="movie-poster poster-placeholder">{movie.title}</div>
      )}

      <div className="movie-card__content">
        <div className="movie-card__topline">
          <span className="movie-year">{movie.year || 'Year unknown'}</span>
          <span className="movie-rating">
            ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
          </span>
        </div>

        <h3>{movie.title}</h3>

        <p className="movie-genres">
          {movie.genres.length ? movie.genres.join(' • ') : 'Genre unavailable'}
        </p>

        <div className="movie-card__footer">
          <span>{movie.runtime || 'Runtime unavailable'}</span>
          <Link to={`/movie/${movie.id}`} className="details-link">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
