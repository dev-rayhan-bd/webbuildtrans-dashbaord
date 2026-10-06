import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { store } from './app/store'
import { router } from './app/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
