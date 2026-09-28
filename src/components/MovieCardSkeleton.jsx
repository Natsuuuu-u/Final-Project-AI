function MovieCardSkeleton() {
  return (
    <article className="movie-card movie-card-skeleton" aria-hidden="true">
      <div className="movie-poster skeleton-surface" />

      <div className="movie-card__content">
        <div className="movie-card__topline">
          <span className="skeleton-line skeleton-year" />
          <span className="skeleton-line skeleton-rating" />
        </div>

        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-genres" />

        <div className="movie-card__footer">
          <span className="skeleton-line skeleton-runtime" />
          <span className="skeleton-line skeleton-button" />
        </div>
      </div>
    </article>
  )
}

export default MovieCardSkeleton
