import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { Toaster } from 'sonner'
import { createHead, UnheadProvider } from '@unhead/react/client'

const head = createHead()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <AuthProvider>
        <App />
        <Toaster position='top-center' richColors/>
      </AuthProvider>
    </UnheadProvider>
  </StrictMode>
)
