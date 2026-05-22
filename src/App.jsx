import React, { useState } from 'react'
import './styles.css'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import History from './pages/History'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    const savedProfile = localStorage.getItem('ft_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="app loading">Cargando FitTrack...</div>
  }

  if (!profile) {
    return <Onboarding onComplete={(newProfile) => {
      setProfile(newProfile)
      localStorage.setItem('ft_profile', JSON.stringify(newProfile))
    }} />
  }

  const handleLogout = () => {
    localStorage.removeItem('ft_profile')
    localStorage.removeItem('ft_sessions')
    setProfile(null)
    setCurrentPage('dashboard')
  }

  return (
    <div className="app">
      <div className="navbar">
        <button 
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-btn ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentPage('history')}
        >
          📈 Historial
        </button>
        <button 
          className="nav-btn logout"
          onClick={handleLogout}
        >
          🚪 Salir
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
