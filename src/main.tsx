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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const store = setupStore();
const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_USE_MOCK_API_IN_BROWSER === 'true')
  import('./mocks/browser');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RTLProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RTLProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
