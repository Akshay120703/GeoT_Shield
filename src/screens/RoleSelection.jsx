import React from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../styles/theme'
import Button from '../components/Button'
import Card from '../components/Card'

const RoleSelection = () => {
  const navigate = useNavigate()

  const roles = [
    { id: 'farmer', name: 'Farmer', icon: '🌾', path: '/farmer/login' },
    { id: 'manufacturer', name: 'Manufacturer', icon: '🏭', path: '/manufacturer/login' },
    { id: 'volunteer', name: 'Volunteer', icon: '👤', path: '/volunteer/login' },
    { id: 'government', name: 'Government', icon: '🏛️', path: '/government/dashboard' },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            color: theme.colors.primary,
            marginBottom: theme.spacing.xxl,
            fontSize: '32px',
          }}
        >
          Select Your Role
        </h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: theme.spacing.lg,
          }}
        >
          {roles.map((role) => (
            <Card
              key={role.id}
              onClick={() => navigate(role.path)}
              style={{
                textAlign: 'center',
                padding: theme.spacing.xxl,
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: theme.spacing.md }}>
                {role.icon}
              </div>
              <h2 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
                {role.name}
              </h2>
              <Button variant="primary" fullWidth>
                Enter
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoleSelection

