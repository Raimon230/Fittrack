import React, { useState } from 'react'

function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    sex: 'male'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.age || !formData.weight || !formData.height) {
      alert('Por favor completa todos los campos')
      return
    }

    const profile = {
      name: formData.name,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      sex: formData.sex
    }

    onComplete(profile)
  }

  return (
    <div className="app">
      <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="form-container" style={{ width: '100%' }}>
          <h1 style={{ color: '#0ea5e9', marginBottom: '24px', textAlign: 'center', fontSize: '2rem' }}>
            🏋️ FitTrack
          </h1>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            Tu entrenador de fitness personal
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                name="name"
                placeholder="Ej: Juan"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Edad</label>
              <input 
                type="number" 
                name="age"
                placeholder="Ej: 25"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Peso (kg)</label>
              <input 
                type="number" 
                name="weight"
                placeholder="Ej: 75"
                step="0.1"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Altura (cm)</label>
              <input 
                type="number" 
                name="height"
                placeholder="Ej: 180"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Sexo</label>
              <select name="sex" value={formData.sex} onChange={handleChange}>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>

            <button type="submit" className="btn" style={{ marginTop: '16px' }}>
              Comenzar 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
