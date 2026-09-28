function ContentState({ loading, error, empty, onRetry, loadingMessage = 'Loading movies...', emptyMessage = 'No movies found.' }) {
  if (loading) {
    return (
      <div className="empty-state content-state" role="status">
        <p>{loadingMessage}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="empty-state content-state" role="alert">
        <p>{error}</p>
        {onRetry && (
          <button type="button" className="primary-button" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    )
  }

  if (empty) {
    return (
      <div className="empty-state content-state" role="status">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return null
}

export default ContentState
