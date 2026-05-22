import React, { useState, useEffect } from 'react'
import './styles.css'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import History from './pages/History'

function App() {
  const [profile, setProfile] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedProfile = localStorage.getItem('ft_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    setLoading(false)
  }, [])

  const handleProfileSave = (profileData) => {
    localStorage.setItem('ft_profile', JSON.stringify(profileData))
    setProfile(profileData)
  }

  if (loading) {
    return <div className="app loading">Cargando...</div>
  }

  if (!profile) {
    return <Onboarding onProfileSave={handleProfileSave} />
  }

  return (
    <div className="app">
      <div className="navbar">
        <button
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentPage('history')}
        >
          Historial
        </button>
        <button
          className="nav-btn logout"
          onClick={() => {
            localStorage.removeItem('ft_profile')
            setProfile(null)
          }}
        >
          Salir
        </button>
      </div>

      <div className="content">
        {currentPage === 'dashboard' && <Dashboard profile={profile} />}
        {currentPage === 'history' && <History />}
      </div>
    </div>
  )
}

export default App

