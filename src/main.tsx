import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppRouter } from './containers/AppRouter.tsx'
import { ThemeProvider } from '@mui/material'
import { theme } from './shared/Theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
)
