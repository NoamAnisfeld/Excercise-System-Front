import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import setupStore from './global-state/store.ts'
import { Provider as ReduxProvider } from 'react-redux'
import RTLProvider from './RTLProvider'

const store = setupStore();

if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => worker.start());
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RTLProvider>
        <App />
      </RTLProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
