import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from 'error-boundary-react'
import { ThemeProvider } from '@mui/material'

import './styles/index.scss'
import App from './App'
import { store } from '@/store'
import muiTheme from './mui-theme'

const rootElement = document.getElementById('Root')!
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <ErrorBoundary fallback={<h1>Error</h1>}>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
)
