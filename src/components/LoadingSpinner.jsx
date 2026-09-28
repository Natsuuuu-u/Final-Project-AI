function LoadingSpinner({ label = 'Loading movies', className = '' }) {
  return (
    <div
      className={`cinema-loading ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <span className="cinema-loading__label">{label}</span>
    </div>
  )
}

export default LoadingSpinner
