'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [horaActual, setHoraActual] = useState(new Date())

  const frases = [
    '💚 Juntos construimos nuestro futuro',
    '💰 Dinero es herramienta, no preocupación',
    '📊 Transparencia crea confianza',
    '🎯 Cada peso cuenta en nuestros sueños',
    '✨ Lo importante es el plan, no la prisa',
    '🌱 Sembramos hoy, cosechamos mañana',
    '❤️ Decisiones juntas, victorias juntas',
    '🏠 Nuestro hogar merece lo mejor',
  ]

  const fraseDelDia = frases[horaActual.getDate() % frases.length]

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraActual(new Date())
    }, 1000)
    return () => clearInterval(intervalo)
  }, [])

  if (!usuarioActual) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f0ebe0 100%)' }}>
        <div className="text-center max-w-md w-full">
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>💚 Finanzas Mozares</h1>
          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            <div className="text-center mb-6">
              <div className="text-5
