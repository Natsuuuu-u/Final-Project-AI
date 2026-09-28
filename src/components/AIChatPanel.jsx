import { useState } from 'react'

function AIChatPanel({ movie }) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!prompt.trim()) {
      return
    }

    const baseMessage = movie
      ? `I looked at ${movie.title}. It is a ${movie.genres.join(', ')} film with a ${movie.rating}/10 rating. `
      : 'I reviewed the available movie data and here is the best fit: '

    setResponse(`${baseMessage}${prompt}`)
    setPrompt('')
  }

  return (
    <section className="ai-panel">
      <div className="panel-header">
        <h3>{movie ? 'Ask AI About This Movie' : 'AI Movie Assistant'}</h3>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <label htmlFor="aiPrompt" className="sr-only">
          Ask a question
        </label>
        <input
          id="aiPrompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={
            movie
              ? 'What is this movie about?'
              : 'What do you want to watch?'
          }
        />

        <button type="submit">Ask</button>
      </form>

      {response && (
        <div className="ai-response">
          <strong>AI response:</strong>
          <p>{response}</p>
        </div>
      )}
    </section>
  )
}

export default AIChatPanel
