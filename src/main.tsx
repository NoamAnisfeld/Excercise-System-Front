import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './global-state/store.ts'
import { Provider as ReduxProvider } from 'react-redux'
import RTLProvider from './RTLProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RTLProvider>
        <App />
      </RTLProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
