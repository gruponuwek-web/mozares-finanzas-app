'use client'

import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { Menu, X, LogOut, Plus, Edit2, Save, Eye, EyeOff } from 'lucide-react'

const firebaseConfig = {
  apiKey: "AIzaSyBoj3Mkn75JkvnMaNF5RjqgPUdJkq1FWrU",
  authDomain: "finanzas-familia-app-5f1c1.firebaseapp.com",
  databaseURL: "https://finanzas-familia-app-5f1c1-default-rtdb.firebaseio.com",
  projectId: "finanzas-familia-app-5f1c1",
  storageBucket: "finanzas-familia-app-5f1c1.firebasestorage.app",
  messagingSenderId: "991323959021",
  appId: "1:991323959021:web:990c1f3862435c2dc1e6e4"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default function FinanzasFamiliarApp() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [pantallaActual, setPantallaActual] = useState('inicio')
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const [horaActual, setHoraActual] = useState(new Date())

  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Vivienda', emoji: '🏠', color: '#e88a7e', vencimiento: 1 },
    { id: 2, nombre: 'Servicios', emoji: '💡', color: '#d4a574', vencimiento: 15 },
    { id: 3, nombre: 'Alimentación', emoji: '🍽️', color: '#6ba59a', vencimiento: null },
    { id: 4, nombre: 'Transporte', emoji: '🚗', color: '#a89bd1', vencimiento: null },
  ])

  const [presupuestos, setPresupuestos] = useState({
    1: { ENE: 8000, FEB: 8000, MAR: 8000, ABR: 8000, MAY: 8000, JUN: 8500, JUL: 8500, AGO: 8000, SEP: 8000, OCT: 8000, NOV: 8000, DIC: 9000 },
    2: { ENE: 1300, FEB: 1300, MAR: 1300, ABR: 1300, MAY: 1300, JUN: 1300, JUL: 1300, AGO: 1300, SEP: 1300, OCT: 1300, NOV: 1300, DIC: 1300 },
    3: { ENE: 2000, FEB: 2000, MAR: 2000, ABR: 2000, MAY: 2000, JUN: 2000, JUL: 2200, AGO: 2000, SEP: 2000, OCT: 2000, NOV: 2000, DIC: 2500 },
    4: { ENE: 1500, FEB: 1500, MAR: 1500, ABR: 1500, MAY: 1500, JUN: 1500, JUL: 1500, AGO: 1500, SEP: 1500, OCT: 1500, NOV: 1500, DIC: 1500 },
  })

  const [cuentas, setCuentas] = useState([
    { id: 1, nombre: 'Débito Él', tipo: 'debito', titular: 'Él', saldo: 15000, institucion: 'Banco Principal', digitos: '1234' },
    { id: 2, nombre: 'Débito Ella', tipo: 'debito', titular: 'Ella', saldo: 12000, institucion: 'Banco Principal', digitos: '5678' },
    { id: 5, nombre: 'Ahorros Familia', tipo: 'ahorros', titular: 'Familia', saldo: 50000, institucion: 'Banco Inversiones', digitos: '9999' },
  ])

  const [transacciones, setTransacciones] = useState([
    { id: 1, fecha: '2024-06-01', tipo: 'deposito', cuenta: 2, cuentaDest: null, monto: 25000, desc: 'Sueldo', obligacion: null },
    { id: 2, fecha: '2024-06-05', tipo: 'gasto', cuenta: 2, cuentaDest: null, monto: 350, desc: 'Supermercado', obligacion: null },
  ])

  const [modoEdicion, setModoEdicion] = useState(false)
  const [mostrarSaldos, setMostrarSaldos] = useState(true)
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

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
      setHoraActual(prev => {
        const nueva = new Date()
        if (nueva.getSeconds() !== prev.getSeconds()) {
          return nueva
        }
        return prev
      })
    }, 100)
    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    if (usuarioActual) {
      const categoriasRef = ref(database, `usuarios/${usuarioActual}/categorias`)
      const presupuestosRef = ref(database, `usuarios/${usuarioActual}/presupuestos`)
      const cuentasRef = ref(database, `usuarios/${usuarioActual}/cuentas`)
      const transaccionesRef = ref(database, `usuarios/${usuarioActual}/transacciones`)

      onValue(categoriasRef, (snapshot) => {
        if (snapshot.exists()) setCategorias(Object.values(snapshot.val()))
      })

      onValue(presupuestosRef, (snapshot) => {
        if (snapshot.exists()) setPresupuestos(snapshot.val())
      })

      onValue(cuentasRef, (snapshot) => {
        if (snapshot.exists()) setCuentas(Object.values(snapshot.val()))
      })

      onValue(transaccionesRef, (snapshot) => {
        if (snapshot.exists()) setTransacciones(Object.values(snapshot.val()))
      })
    }
  }, [usuarioActual])

  const guardarEnFirebase = (path, data) => {
    if (usuarioActual) {
      set(ref(database, `usuarios/${usuarioActual}/${path}`), data).catch(err => console.error(err))
    }
  }

  useEffect(() => {
    guardarEnFirebase('categorias', categorias)
  }, [categorias])

  useEffect(() => {
    guardarEnFirebase('presupuestos', presupuestos)
  }, [presupuestos])

  useEffect(() => {
    guardarEnFirebase('cuentas', cuentas)
  }, [cuentas])

  useEffect(() => {
    guardarEnFirebase('transacciones', transacciones)
  }, [transacciones])

  if (!usuarioActual) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f0ebe0 100%)' }}>
        <div className="text-center max-w-md w-full">
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>💚 Finanzas Mozares</h1>
          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold font-mono" style={{ color: '#2d3e3b', letterSpacing: '0.1em' }}>{horaActual.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
              <div className="text-sm mt-2" style={{ color: '#8b9693' }}>{horaActual.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            </div>
            <p className="text-lg font-medium mb-8" style={{ color: '#6ba59a', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>"{fraseDelDia}"</p>
            <p className="mb-8 font-bold" style={{ color: '#2d3e3b' }}>¿Quién eres?</p>
            <div className="flex gap-4">
              <button onClick={() => { setUsuarioActual('el'); setPantallaActual('dashboard') }} className="flex-1 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)' }}>💙 Él</button>
              <button onClick={() => { setUsuarioActual('ella'); setPantallaActual('dashboard') }} className="flex-1 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #f6a192 0%, #e88a7e 100%)' }}>🧡 Ella</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f0ebe0 100%)' }} className="min-h-screen">
      <nav style={{ background: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid rgba(212, 165, 116, 0.2)' }} className="sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>💚 Finanzas Mozares</h1>
          <div className="hidden md:flex gap-1">
            {['dashboard', 'presupuesto', 'cuentas', 'transacciones'].map(pantalla => (
              <button key={pantalla} onClick={() => setPantallaActual(pantalla)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${pantallaActual === pantalla ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`} style={{ background: pantallaActual === pantalla ? 'linear-gradient(135deg, #6ba59a 0%, #5a9189 100%)' : 'transparent' }}>
                {pantalla === 'dashboard' && '📊'}
                {pantalla === 'presupuesto' && '📋'}
                {pantalla === 'cuentas' && '🏦'}
                {pantalla === 'transacciones' && '💳'}
              </button>
            ))}
            <button onClick={() => { setUsuarioActual(null); setPantallaActual('inicio') }} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"><LogOut size={18} /></button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {pantallaActual === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>📊 Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(107, 165, 154, 0.1) 0%, rgba(107, 165, 154, 0.05) 100%)', border: '2px solid rgba(107, 165, 154, 0.3)' }}>
                <p className="text-xs uppercase font-semibold" style={{ color: '#5a9189' }}>Saldo Total</p>
                <p className="text-3xl font-bold mt-2" style={{ color: '#2d3e3b' }}>${cuentas.reduce((sum, c) => sum + c.saldo, 0).toLocaleString('es-MX', { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>
        )}

        {pantallaActual === 'presupuesto' && (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>📋 Presupuesto</h2>
            <p style={{ color: '#8b9693' }}>Presupuesto mensual configurado ✅</p>
          </div>
        )}

        {pantallaActual === 'cuentas' && (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>🏦 Cuentas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cuentas.map(cuenta => (
                <div key={cuenta.id} className="p-6 rounded-2xl bg-white shadow-lg">
                  <div style={{ background: 'linear-gradient(135deg, #2d3e3b 0%, #1f2a28 100%)', color: '#fff' }} className="px-4 py-3 rounded-lg mb-4">
                    <p className="text-sm opacity-90">{cuenta.tipo}</p>
                    <h3 className="text-lg font-bold mt-1">{cuenta.nombre}</h3>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#6ba59a' }}>${mostrarSaldos ? cuenta.saldo.toLocaleString('es-MX') : '••••'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pantallaActual === 'transacciones' && (
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2d3e3b', fontFamily: '"Playfair Display", serif' }}>💳 Transacciones</h2>
            <div className="space-y-2">
              {transacciones.slice().reverse().map(t => (
                <div key={t.id} className="p-3 rounded-lg bg-white flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#2d3e3b' }}>
                      {t.tipo === 'deposito' ? '📥' : '💸'} {t.desc}
                    </p>
                    <p className="text-xs" style={{ color: '#8b9693' }}>{t.fecha}</p>
                  </div>
                  <p className="font-bold" style={{ color: t.tipo === 'deposito' ? '#6ba59a' : '#e88a7e' }}>
                    {t.tipo === 'deposito' ? '+' : '-'}${t.monto.toLocaleString('es-MX')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
