import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './screens/SplashScreen'
import RoleSelection from './screens/RoleSelection'
import FarmerLogin from './screens/Farmer/FarmerLogin'
import FarmerDashboard from './screens/Farmer/FarmerDashboard'
import ManufacturerLogin from './screens/Manufacturer/ManufacturerLogin'
import ManufacturerDashboard from './screens/Manufacturer/ManufacturerDashboard'
import VolunteerLogin from './screens/Volunteer/VolunteerLogin'
import VolunteerDashboard from './screens/Volunteer/VolunteerDashboard'
import GovernmentDashboard from './screens/Government/GovernmentDashboard'
import DataVerification from './screens/DataVerification'

// Role-based route protection
const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = sessionStorage.getItem('userRole')
  if (!userRole || userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash screen on initial load for 2.5-3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        
        {/* Farmer Routes */}
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute requiredRole="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manufacturer Routes */}
        <Route path="/manufacturer/login" element={<ManufacturerLogin />} />
        <Route
          path="/manufacturer/dashboard"
          element={
            <ProtectedRoute requiredRole="manufacturer">
              <ManufacturerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Volunteer Routes */}
        <Route path="/volunteer/login" element={<VolunteerLogin />} />
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Government Routes */}
        <Route
          path="/government/dashboard"
          element={
            (() => {
              // Allow direct access for government dashboard (set role if not set)
              if (!sessionStorage.getItem('userRole')) {
                sessionStorage.setItem('userRole', 'government')
              }
              return <GovernmentDashboard />
            })()
          }
        />

        {/* Data Verification (accessible to all authenticated users) */}
        <Route path="/verification" element={<DataVerification />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

