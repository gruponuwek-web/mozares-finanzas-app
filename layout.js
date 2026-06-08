import './globals.css'

export const metadata = {
  title: '💚 Finanzas Mozares',
  description: 'App de finanzas familiar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
