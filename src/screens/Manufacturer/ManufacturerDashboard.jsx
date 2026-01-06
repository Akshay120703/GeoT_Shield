import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles/theme'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import Card from '../../components/Card'
import HashDisplay from '../../components/HashDisplay'
import Modal from '../../components/Modal'
import { generateMockHash, generatePreviousHash } from '../../utils/hashSimulator'
import { mockFarmers, mockAuditLogs } from '../../data/mockData'
import AuditLog from '../../components/AuditLog'

const ManufacturerDashboard = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    batchNumber: '',
    rawMaterialSource: '',
    quantityReceived: '',
    productType: '',
    factoryLat: '',
    factoryLng: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [manufacturingHash, setManufacturingHash] = useState(null)
  const [previousHash, setPreviousHash] = useState(null)
  const [mismatchAlert, setMismatchAlert] = useState(null)
  const [showMismatchModal, setShowMismatchModal] = useState(false)

  const handleGPSCapture = () => {
    setFormData({
      ...formData,
      factoryLat: '28.6139',
      factoryLng: '77.2090',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulate matching with farmer data
    const farmerRecord = mockFarmers[0]
    const farmerQuantity = farmerRecord.quantity
    const receivedQuantity = parseInt(formData.quantityReceived)

    if (receivedQuantity !== farmerQuantity) {
      setMismatchAlert({
        farmerQuantity,
        receivedQuantity,
        difference: Math.abs(farmerQuantity - receivedQuantity),
      })
      setShowMismatchModal(true)
    }

    const hash = generateMockHash(formData)
    const prevHash = generatePreviousHash()
    setManufacturingHash(hash)
    setPreviousHash(prevHash)
    setSubmitted(true)
  }

  const manufacturerData = JSON.parse(sessionStorage.getItem('manufacturerData') || '{}')

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
          <h1 style={{ color: theme.colors.primary }}>Manufacturer Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            Logout
          </Button>
        </div>

        {!submitted ? (
          <Card>
            <h2 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg }}>
              Create Manufacturing Record
            </h2>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Batch Number"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                required
              />
              <FormInput
                label="Raw Material Source (Farmer Production Hash)"
                value={formData.rawMaterialSource}
                onChange={(e) => setFormData({ ...formData, rawMaterialSource: e.target.value })}
                placeholder="e.g., 0xabc123..."
                required
              />
              <FormInput
                label="Quantity Received (kg)"
                type="number"
                value={formData.quantityReceived}
                onChange={(e) => setFormData({ ...formData, quantityReceived: e.target.value })}
                required
              />
              <FormInput
                label="Product Type"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                placeholder="e.g., Cigarettes"
                required
              />
              <div style={{ marginBottom: theme.spacing.md }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>
                  Factory Location (Simulated GPS)
                </label>
                <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                  <FormInput
                    label="Latitude"
                    value={formData.factoryLat}
                    onChange={(e) => setFormData({ ...formData, factoryLat: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <FormInput
                    label="Longitude"
                    value={formData.factoryLng}
                    onChange={(e) => setFormData({ ...formData, factoryLng: e.target.value })}
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
                Create Manufacturing Record
              </Button>
            </form>
          </Card>
        ) : (
          <>
            {mismatchAlert && (
              <Modal
                isOpen={showMismatchModal}
                onClose={() => setShowMismatchModal(false)}
                title="⚠️ Quantity Mismatch Alert"
              >
                <div style={{ padding: theme.spacing.md }}>
                  <p style={{ marginBottom: theme.spacing.md }}>
                    <strong>Farmer Production Quantity:</strong> {mismatchAlert.farmerQuantity} kg
                  </p>
                  <p style={{ marginBottom: theme.spacing.md }}>
                    <strong>Manufacturer Received Quantity:</strong> {mismatchAlert.receivedQuantity} kg
                  </p>
                  <p style={{ 
                    color: theme.colors.error,
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}>
                    Difference: {mismatchAlert.difference} kg
                  </p>
                </div>
              </Modal>
            )}

            <Card>
              <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>✅</div>
                <h2 style={{ color: theme.colors.success, marginBottom: theme.spacing.md }}>
                  Manufacturing Record Created!
                </h2>
                {mismatchAlert && (
                  <div style={{ 
                    padding: theme.spacing.md,
                    backgroundColor: theme.colors.warning + '20',
                    borderRadius: theme.borderRadius,
                    marginBottom: theme.spacing.md,
                    color: theme.colors.warning,
                  }}>
                    ⚠️ Mismatch detected - Please verify quantities
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
                Simulated GPS Tracking Logs
              </h3>
              <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                {[
                  { timestamp: '2024-01-16T08:00:00Z', location: 'Factory A', status: 'Loaded' },
                  { timestamp: '2024-01-16T10:30:00Z', location: 'Distribution Center', status: 'In Transit' },
                  { timestamp: '2024-01-16T14:00:00Z', location: 'Warehouse B', status: 'Delivered' },
                ].map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: theme.spacing.sm,
                      borderLeft: `4px solid ${theme.colors.secondary}`,
                      marginBottom: theme.spacing.sm,
                      backgroundColor: theme.colors.background,
                    }}
                  >
                    <strong>{log.status}</strong> - {log.location} | {new Date(log.timestamp).toLocaleString()}
                  </div>
                ))}
              </div>
            </Card>

            {manufacturingHash && (
              <HashDisplay
                previousHash={previousHash}
                currentHash={manufacturingHash}
                timestamp={new Date().toISOString()}
                actorId={manufacturerData.manufacturerId || 'MANU-001'}
              />
            )}
          </>
        )}

        <AuditLog logs={mockAuditLogs.filter(log => log.actor.startsWith('M'))} />
      </div>
    </div>
  )
}

export default ManufacturerDashboard

