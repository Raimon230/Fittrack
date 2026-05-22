import React, { useState, useEffect } from 'react'

function Dashboard({ profile }) {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('ft_sessions')
    setSessions(saved ? JSON.parse(saved) : [])
  }, [])

  const calculateTDEE = () => {
    const { weight, height, age, sex } = profile
    let tdee = (10 * weight + 6.25 * height - 5 * age + 5) * 1.55
    if (sex === 'female') {
      tdee = (10 * weight + 6.25 * height - 5 * age - 161) * 1.55
    }
    return Math.round(tdee)
  }

  const handleFinishWorkout = () => {
    const volume = Math.floor(Math.random() * 100) + 50
    const now = new Date()
    const date = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const time = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const newSession = {
      id: Date.now(),
      date,
      time,
      volume
    }

    const allSessions = [...sessions, newSession]
    setSessions(allSessions)
    localStorage.setItem('ft_sessions', JSON.stringify(allSessions))
    
    alert(`✅ Entrenamiento guardado!\nVolumen: ${volume} reps`)
  }

  const tdee = calculateTDEE()
  const deficit = -700
  const dailyGoal = tdee + deficit

  return (
    <div className="dashboard">
      {/* Profile Card */}
      <div className="profile-card">
        <h2>👋 Hola, {profile.name}!</h2>
        
        <div className="profile-info">
          <p>Edad</p>
          <p className="value">{profile.age} años</p>
        </div>

        <div className="profile-info">
          <p>Peso</p>
          <p className="value">{profile.weight} kg</p>
        </div>

        <div className="profile-info">
          <p>Altura</p>
          <p className="value">{profile.height} cm</p>
        </div>

        <div className="profile-info">
          <p>Sexo</p>
          <p className="value">{profile.sex === 'male' ? '♂ Masculino' : '♀ Femenino'}</p>
        </div>
      </div>

      {/* TDEE Section */}
      <div className="tdee-section">
        <h3>⚡ Nutrición</h3>
        
        <div className="tdee-row">
          <span className="tdee-label">TDEE (Gasto diario)</span>
          <span className="tdee-value">{tdee} kcal</span>
        </div>

        <div className="tdee-row">
          <span className="tdee-label">Déficit</span>
          <span className="tdee-value" style={{ color: '#ef4444' }}>{deficit} kcal</span>
        </div>

        <div className="tdee-row" style={{ backgroundColor: '#1a1a2e', borderLeft: '3px solid #10b981' }}>
          <span className="tdee-label">🎯 Objetivo diario</span>
          <span className="tdee-value" style={{ color: '#10b981', fontSize: '1.3rem' }}>
            {dailyGoal} kcal
          </span>
        </div>
      </div>

      {/* Workout Section */}
      <div className="workout-section">
        <h3>💪 Entrenamiento</h3>
        
        <div style={{ 
          backgroundColor: '#000', 
          padding: '16px', 
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center',
          borderLeft: '3px solid #0ea5e9'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Sesiones completadas</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>
            {sessions.length} 🔥
          </p>
        </div>

        <button 
          className="btn btn-finish-workout"
          onClick={handleFinishWorkout}
        >
          ✅ Finalizar Entrenamiento
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        backgroundColor: '#1a1a1a', 
        padding: '16px', 
        borderRadius: '12px',
        border: '1px solid #0ea5e9',
        textAlign: 'center'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '8px' }}>
          Fórmula TDEE Mifflin-St Jeor
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
          Multiplicador de actividad: 1.55 (moderado)
        </p>
      </div>
    </div>
  )
}

export default Dashboard
