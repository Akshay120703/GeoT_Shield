import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles/theme'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import Card from '../../components/Card'
import HashDisplay from '../../components/HashDisplay'
import { generateMockHash, generatePreviousHash } from '../../utils/hashSimulator'
import { mockAuditLogs } from '../../data/mockData'
import AuditLog from '../../components/AuditLog'

const FarmerDashboard = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    harvestDate: '',
    gpsLat: '',
    gpsLng: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [productionHash, setProductionHash] = useState(null)
  const [previousHash, setPreviousHash] = useState(null)

  const handleGPSCapture = () => {
    // Simulate GPS capture
    setFormData({
      ...formData,
      gpsLat: '28.7041',
      gpsLng: '77.1025',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate hash generation
    const hash = generateMockHash(formData)
    const prevHash = generatePreviousHash()
    setProductionHash(hash)
    setPreviousHash(prevHash)
    setSubmitted(true)
  }

  const farmerData = JSON.parse(sessionStorage.getItem('farmerData') || '{}')

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <h1 style={{ color: theme.colors.primary }}>Farmer Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            Logout
          </Button>
        </div>

        {!submitted ? (
          <Card>
            <h2 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg }}>
              Submit Production Record
            </h2>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Crop Type (Tobacco Variety)"
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                placeholder="e.g., Virginia Tobacco"
                required
              />
              <FormInput
                label="Quantity Produced (kg)"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
              <FormInput
                label="Date of Harvest"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                required
              />
              <div style={{ marginBottom: theme.spacing.md }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>
                  GPS Location (Simulated)
                </label>
                <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                  <FormInput
                    label="Latitude"
                    value={formData.gpsLat}
                    onChange={(e) => setFormData({ ...formData, gpsLat: e.target.value })}
                    placeholder="Auto-capture"
                    style={{ flex: 1 }}
                  />
                  <FormInput
                    label="Longitude"
                    value={formData.gpsLng}
                    onChange={(e) => setFormData({ ...formData, gpsLng: e.target.value })}
                    placeholder="Auto-capture"
                    style={{ flex: 1 }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleGPSCapture}
                  variant="secondary"
                  style={{ marginTop: theme.spacing.sm }}
                >
                  📍 Simulate GPS Capture
                </Button>
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Submit Production Record
              </Button>
            </form>
          </Card>
        ) : (
          <>
            <Card>
              <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>✅</div>
                <h2 style={{ color: theme.colors.success, marginBottom: theme.spacing.md }}>
                  Production Record Submitted Successfully!
                </h2>
                <div style={{ 
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius,
                  marginBottom: theme.spacing.md,
                }}>
                  <strong>Status:</strong> Awaiting Manufacturer Match
                </div>
              </div>
            </Card>

            {productionHash && (
              <HashDisplay
                previousHash={previousHash}
                currentHash={productionHash}
                timestamp={new Date().toISOString()}
                actorId={farmerData.farmId || 'FARM-001'}
              />
            )}
          </>
        )}

        <AuditLog logs={mockAuditLogs.filter(log => log.actor.startsWith('F'))} />
      </div>
    </div>
  )
}

export default FarmerDashboard

