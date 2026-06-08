'use client'
import { useState, useEffect } from 'react'
export default function Home() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [horaActual, setHoraActual] = useState(new Date())
  const frases = ['💚 Juntos construimos nuestro futuro', '💰 Dinero es herramienta, no preocupación', '📊 Transparencia crea confianza', '🎯 Cada peso cuenta en nuestros sueños', '✨ Lo importante es el plan, no la prisa', '🌱 Sembramos hoy, cosechamos mañana', '❤️ Decisiones juntas, victorias juntas', '🏠 Nuestro hogar merece lo mejor']
  const fraseDelDia = frases[horaActual.getDate() % frases.length]
  useEffect(() => {
    const intervalo = setInterval(() => setHoraActual(new Date()), 1000)
    return () => clearInterval(intervalo)
  }, [])
  if (!usuarioActual) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f0ebe0 100%)' }} className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 style={{ color: '#2d3e3b', fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>💚 Finanzas Mozares</h1>
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2d3e3b', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{horaActual.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#8b9693' }}>{horaActual.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            </div>
            <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '2rem', color: '#6ba59a', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>"{fraseDelDia}"</p>
            <p style={{ marginBottom: '2rem', fontWeight: 'bold', color: '#2d3e3b' }}>¿Quién eres?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setUsuarioActual('el')} style={{ flex: 1, padding: '1rem', borderRadius: '1.5rem', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>💙 Él</button>
              <button onClick={() => setUsuarioActual('ella')} style={{ flex: 1, padding: '1rem', borderRadius: '1.5rem', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #f6a192 0%, #e88a7e 100%)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>🧡 Ella</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const cuentas = [
    { id: 1, nombre: 'Débito Él', tipo: 'debito', saldo: 15000 },
    { id: 2, nombre: 'Débito Ella', tipo: 'debito', saldo: 12000 },
    { id: 3, nombre: 'Ahorros Familia', tipo: 'ahorros', saldo: 50000 },
  ]
  return (
    <div style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f0ebe0 100%)' }} className="min-h-screen">
      <nav style={{ background: 'rgba(255, 255, 255, 0.95)', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3e3b', fontFamily: 'Playfair Display, serif' }}>💚 Finanzas Mozares</h1>
          <button onClick={() => setUsuarioActual(null)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600', color: 'white', background: '#e88a7e', border: 'none', cursor: 'pointer' }}>Salir</button>
        </div>
      </nav>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#2d3e3b', fontFamily: 'Playfair Display, serif' }}>📊 Dashboard - {usuarioActual === 'el' ? '💙 Él' : '🧡 Ella'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {cuentas.map(cuenta => (
            <div key={cuenta.id} style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.75, color: '#8b9693' }}>{cuenta.tipo}</p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#2d3e3b' }}>{cuenta.nombre}</h3>
              <p style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '1rem', color: '#6ba59a' }}>${cuenta.saldo.toLocaleString('es-MX')}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3e3b' }}>✅ ¡App funcionando!</h3>
          <p style={{ color: '#8b9693' }}>La app está en vivo y funcionando correctamente. Puedes comenzar a usar Finanzas Mozares 💚</p>
        </div>
      </div>
    </div>
  )
}
