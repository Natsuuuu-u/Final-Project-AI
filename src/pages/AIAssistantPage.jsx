import AIChatPanel from '../components/AIChatPanel'

function AIAssistantPage() {
  return (
    <main className="page container ai-page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Smart recommendations</p>
          <h1>AI Movie Assistant</h1>
        </div>
      </section>

      <AIChatPanel />
    </main>
  )
}

export default AIAssistantPage
