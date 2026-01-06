import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles/theme'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import Card from '../../components/Card'

const FarmerLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    farmId: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate login - store role in session
    sessionStorage.setItem('userRole', 'farmer')
    sessionStorage.setItem('farmerData', JSON.stringify(formData))
    navigate('/farmer/dashboard')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg, textAlign: 'center' }}>
          Farmer Login
        </h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormInput
            label="Farm ID"
            value={formData.farmId}
            onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>
        </form>
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          fullWidth
          style={{ marginTop: theme.spacing.md }}
        >
          Back to Role Selection
        </Button>
      </Card>
    </div>
  )
}

export default FarmerLogin

