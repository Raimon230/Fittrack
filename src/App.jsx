import React, { useState } from 'react'
import './styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>FitTrack</h1>
      <p>Tu aplicación de seguimiento de fitness</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App
