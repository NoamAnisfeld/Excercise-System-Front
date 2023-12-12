import './App.css'
import { useResumeApiSession } from './hooks'
import CssBaseline from '@mui/material/CssBaseline'
import Router from './routing/Router'

function App() {
  
  useResumeApiSession();

  return (
    <>
      <CssBaseline />
      <Router />
    </>
  )
}

export default App
