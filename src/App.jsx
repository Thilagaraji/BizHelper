import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ServiceRequestPortal from './components/ServiceRequestPortal'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'requests' && <ServiceRequestPortal />}
    </Layout>
  )
}

export default App
