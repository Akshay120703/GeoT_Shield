import React from 'react'
import { theme } from '../styles/theme'
import Card from '../components/Card'
import { mockFarmers, mockManufacturers } from '../data/mockData'

const DataVerification = () => {
  const totalProduction = mockFarmers.reduce((sum, f) => sum + f.quantity, 0)
  const totalManufacturing = mockManufacturers.reduce((sum, m) => sum + m.quantityReceived, 0)
  const isMatch = totalProduction === totalManufacturing

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg }}>
          Data Verification Engine
        </h1>

        <Card>
          <h2 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg }}>
            Auto-Comparison Results
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
            <div>
              <h3 style={{ marginBottom: theme.spacing.md }}>Farmer Production Data</h3>
              {mockFarmers.map((farmer) => (
                <div
                  key={farmer.id}
                  style={{
                    padding: theme.spacing.md,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <div><strong>Farm ID:</strong> {farmer.farmId}</div>
                  <div><strong>Quantity:</strong> {farmer.quantity} kg</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ marginBottom: theme.spacing.md }}>Manufacturer Intake Data</h3>
              {mockManufacturers.map((manufacturer) => (
                <div
                  key={manufacturer.id}
                  style={{
                    padding: theme.spacing.md,
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.borderRadius,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <div><strong>Manufacturer ID:</strong> {manufacturer.manufacturerId}</div>
                  <div><strong>Quantity:</strong> {manufacturer.quantityReceived} kg</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: theme.spacing.xl,
              backgroundColor: isMatch ? theme.colors.success + '20' : theme.colors.warning + '20',
              borderRadius: theme.borderRadius,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>
              {isMatch ? '✅' : '⚠️'}
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isMatch ? theme.colors.success : theme.colors.warning,
              }}
            >
              {isMatch ? 'MATCH' : 'MISMATCH'}
            </div>
            {!isMatch && (
              <div style={{ marginTop: theme.spacing.md }}>
                Difference: {Math.abs(totalProduction - totalManufacturing)} kg
              </div>
            )}
          </div>

          <div style={{ marginTop: theme.spacing.lg, padding: theme.spacing.md, backgroundColor: theme.colors.background, borderRadius: theme.borderRadius }}>
            <strong>Status:</strong> Records verified and locked (non-editable) | All logs are append-only
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DataVerification

