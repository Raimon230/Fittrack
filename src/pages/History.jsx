import React, { useState, useEffect } from 'react'

function History() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('ft_sessions')
    if (saved) {
      setSessions(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="history-container">
      <h1 className="history-header">📈 Historial de Entrenamientos</h1>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <p>📭 Sin entrenamientos aún</p>
          <p style={{ fontSize: '0.9rem', opacity: '0.7' }}>
            ¡Completa tu primer entrenamiento en el Dashboard!
          </p>
        </div>
      ) : (
        <>
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '16px', 
            borderRadius: '12px',
            border: '1px solid #0ea5e9',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontSize: '0.95rem' }}>
              Total de sesiones
            </p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#0ea5e9' }}>
              {sessions.length}
            </p>
          </div>

          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <div className="session-info">
                <p className="session-date">{session.date}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                  {session.time}
                </p>
              </div>
              <div className="session-volume">
                <p>Volumen</p>
                <p className="value">{session.volume}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default History
