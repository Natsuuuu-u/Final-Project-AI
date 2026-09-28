import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import GenresPage from './pages/GenresPage'
import AIAssistantPage from './pages/AIAssistantPage'
import MovieDetailPage from './pages/MovieDetailPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/ai" element={<AIAssistantPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
