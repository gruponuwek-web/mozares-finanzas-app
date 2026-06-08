'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  if (!user) {
    return (
      <div style={{ background: '#faf8f3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>💚 Finanzas Mozares</h1>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{time.toLocaleTimeString()}</p>
            <p style={{ marginBottom: '2rem' }}>Elige quién eres:</p>
            <button onClick={() => setUser('el')} style={{ padding: '1rem 2rem', margin: '0.5rem', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>💙 Él</button>
            <button onClick={() => setUser('ella')} style={{ padding: '1rem 2rem', margin: '0.5rem', background: '#f6a192', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>🧡 Ella</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#faf8f3', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>💚 Finanzas Mozares - {user === 'el' ? '💙 Él' : '🧡 Ella'}</h1>
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>✅ ¡APP FUNCIONANDO!</p>
      <button onClick={() => setUser(null)} style={{ display: 'block', margin: '2rem auto', padding: '0.5rem 1rem', background: '#e88a7e', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Salir</button>
    </div>
  )
}
