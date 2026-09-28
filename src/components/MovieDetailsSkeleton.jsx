function MovieDetailsSkeleton() {
  return (
    <main
      className="page movie-page movie-details-skeleton"
      role="status"
      aria-label="Loading movie details and cast"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading movie details and cast...</span>
      <section className="movie-hero">
        <div className="container movie-hero__content">
          <div className="movie-detail-poster skeleton-surface" />

          <div className="movie-hero__info">
            <div className="skeleton-line skeleton-eyebrow" />
            <div className="skeleton-line skeleton-detail-title" />

            <div className="movie-meta skeleton-meta">
              <span className="skeleton-line" />
              <span className="skeleton-line" />
              <span className="skeleton-line" />
            </div>

            <div className="genre-list skeleton-genres">
              <span className="skeleton-line" />
              <span className="skeleton-line" />
              <span className="skeleton-line" />
            </div>

            <div className="skeleton-overview">
              <span className="skeleton-line" />
              <span className="skeleton-line" />
              <span className="skeleton-line" />
            </div>
          </div>
        </div>
      </section>

      <section className="container movie-details-grid">
        <div className="movie-details-card">
          <div className="skeleton-line skeleton-section-title" />
          <div className="skeleton-credit-row">
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
          <div className="skeleton-credit-row skeleton-cast-row">
            <span className="skeleton-line" />
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
          <div className="skeleton-credit-row">
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
        </div>

        <div className="movie-details-card">
          <div className="skeleton-line skeleton-section-title" />
          <div className="skeleton-overview">
            <span className="skeleton-line" />
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default MovieDetailsSkeleton
