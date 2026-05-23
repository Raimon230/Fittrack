import React, { useState } from 'react'
import { routines } from '../data/routines'

function Workout() {
  const [selectedRoutine, setSelectedRoutine] = useState('push')

  return (
    <div className="workout-page">
      <h1 style={{ marginBottom: '20px' }}>
        💪 Entrenamiento
      </h1>

      {/* Selector de rutina */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        marginBottom: '24px'
      }}>
        {Object.keys(routines).map((routine) => (
          <button
            key={routine}
            className={`nav-btn ${selectedRoutine === routine ? 'active' : ''}`}
            onClick={() => setSelectedRoutine(routine)}
          >
            {routine.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Lista ejercicios */}
      <div>
        {routines[selectedRoutine].map((exercise, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#1a1a1a',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #0ea5e9'
            }}
          >
            <h3 style={{ marginBottom: '12px' }}>
              {exercise}
            </h3>

            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="number"
                placeholder="Peso"
                style={{ flex: 1 }}
              />

              <input
                type="number"
                placeholder="Reps"
                style={{ flex: 1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-finish-workout"
        style={{ marginTop: '24px' }}
      >
        ✅ Guardar entrenamiento
      </button>
    </div>
  )
}

export default Workout
