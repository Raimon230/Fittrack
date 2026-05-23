import React, { useState } from 'react'
import { routines } from '../data/routines'

function Workout() {
  const [selectedRoutine, setSelectedRoutine] = useState('push')

  const [workoutData, setWorkoutData] = useState({})

  const handleChange = (exercise, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: value
      }
    }))
  }

  const handleSaveWorkout = () => {
    let totalVolume = 0

    Object.values(workoutData).forEach(exercise => {
      const weight = Number(exercise.weight || 0)
      const reps = Number(exercise.reps || 0)

      totalVolume += weight * reps
    })

    const now = new Date()

    const newSession = {
      id: Date.now(),
      routine: selectedRoutine.toUpperCase(),
      date: now.toLocaleDateString('es-ES'),
      time: now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      volume: totalVolume,
      exercises: workoutData
    }

    const existing =
      JSON.parse(localStorage.getItem('ft_sessions')) || []

    const updated = [...existing, newSession]

    localStorage.setItem(
      'ft_sessions',
      JSON.stringify(updated)
    )

    alert(`✅ Entrenamiento guardado\nVolumen total: ${totalVolume}`)

    setWorkoutData({})
  }

  return (
    <div className="workout-page">
      <h1 style={{ marginBottom: '20px' }}>
        💪 Entrenamiento
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          marginBottom: '24px'
        }}
      >
        {Object.keys(routines).map(routine => (
          <button
            key={routine}
            className={`nav-btn ${
              selectedRoutine === routine ? 'active' : ''
            }`}
            onClick={() => setSelectedRoutine(routine)}
          >
            {routine.toUpperCase()}
          </button>
        ))}
      </div>

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

            <div
              style={{
                display: 'flex',
                gap: '10px'
              }}
            >
              <input
                type="number"
                placeholder="Peso"
                value={workoutData[exercise]?.weight || ''}
                onChange={(e) =>
                  handleChange(
                    exercise,
                    'weight',
                    e.target.value
                  )
                }
                style={{ flex: 1 }}
              />

              <input
                type="number"
                placeholder="Reps"
                value={workoutData[exercise]?.reps || ''}
                onChange={(e) =>
                  handleChange(
                    exercise,
                    'reps',
                    e.target.value
                  )
                }
                style={{ flex: 1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-finish-workout"
        style={{ marginTop: '24px' }}
        onClick={handleSaveWorkout}
      >
        ✅ Guardar entrenamiento
      </button>
    </div>
  )
}

export default Workout
