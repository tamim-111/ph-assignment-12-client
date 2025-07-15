import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// for @react-pdf/renderer buffer problem
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

// Create a QueryClient instance
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
