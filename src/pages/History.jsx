import React, { useState } from 'react'

function History() {
  const [sessions] = useState(() => {
    const saved = localStorage.getItem('ft_sessions')
    return saved ? JSON.parse(saved) : []
  })

  return (
    <div className="history-container">
      <h1 className="history-header">📈 Historial de Entrenamientos</h1>
      
      {sessions.length === 0 ? (
        <div className="empty-state">
          <p>📭 No hay entrenamientos guardados aún</p>
          <p style={{ fontSize: '0.9rem' }}>¡Ve al Dashboard y completa tu primer entrenamiento!</p>
        </div>
      ) : (
        <>
          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: '#1a1a1a', 
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
            borderLeft: '4px solid #0ea5e9'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Total de sesiones</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>
              {sessions.length} 💪
            </p>
          </div>

          {sessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-info">
                <p className="session-date">{session.date}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                  🕐 {session.time}
                </p>
              </div>
              <div className="session-volume">
                <p>Volumen</p>
                <div className="value">{session.volume}</div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>reps</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default History
