import MovieCardSkeleton from './MovieCardSkeleton'

function MovieGridSkeleton({ count = 6, className = '' }) {
  return (
    <div
      className={`movie-grid movie-grid-skeleton ${className}`.trim()}
      role="status"
      aria-label="Loading movies"
      aria-live="polite"
    >
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default MovieGridSkeleton
