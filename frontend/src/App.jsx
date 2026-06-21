import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CtfLayout from './components/CtfLayout'
import Home from './pages/Home'
import VerifyTeam from './pages/VerifyTeam'
import FeedbackForm from './pages/FeedbackForm'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<VerifyTeam />} />
        <Route path="/feedback/:teamId" element={<FeedbackForm />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <CtfLayout>
        <AnimatedRoutes />
      </CtfLayout>
    </Router>
  )
}

export default App

