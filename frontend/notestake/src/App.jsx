import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NotesDetails from './pages/NotesDetails'

function App() {
  return (
    <div data-theme="dark" className="min-h-screen bg-base-200 text-base-content antialiased selection:bg-primary/30">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NotesDetails />} />
      </Routes>
    </div>
  )
}

export default App

