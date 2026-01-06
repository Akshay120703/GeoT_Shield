import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles/theme'
import Button from '../../components/Button'
import Card from '../../components/Card'
import MapView from '../../components/MapView'
import { mockFarmers, mockManufacturers, mockHotspots, mockAuditLogs } from '../../data/mockData'

const GovernmentDashboard = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    region: '',
    date: '',
    entity: '',
  })

  // Simulate data calculations
  const totalProduction = mockFarmers.reduce((sum, f) => sum + f.quantity, 0)
  const totalManufacturing = mockManufacturers.reduce((sum, m) => sum + m.quantityReceived, 0)
  const mismatchCount = Math.abs(totalProduction - totalManufacturing) > 0 ? 1 : 0

  const handleExport = () => {
    // Simulate CSV export
    alert('CSV Export simulated (no actual file generated)')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <h1 style={{ color: theme.colors.primary }}>Government Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            Logout
          </Button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
          <Card>
            <h3 style={{ color: theme.colors.textLight, marginBottom: theme.spacing.sm }}>Total Production</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.primary }}>
              {totalProduction} kg
            </div>
          </Card>
          <Card>
            <h3 style={{ color: theme.colors.textLight, marginBottom: theme.spacing.sm }}>Total Manufacturing</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.secondary }}>
              {totalManufacturing} kg
            </div>
          </Card>
          <Card>
            <h3 style={{ color: theme.colors.textLight, marginBottom: theme.spacing.sm }}>Mismatch Alerts</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: mismatchCount > 0 ? theme.colors.error : theme.colors.success }}>
              {mismatchCount}
            </div>
          </Card>
          <Card>
            <h3 style={{ color: theme.colors.textLight, marginBottom: theme.spacing.sm }}>Illicit Hotspots</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.warning }}>
              {mockHotspots.length}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>Filters</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.md }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                style={{
                  width: '100%',
                  padding: theme.spacing.md,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius,
                }}
              >
                <option value="">All Regions</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: theme.spacing.md,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius,
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>Entity</label>
              <select
                value={filters.entity}
                onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
                style={{
                  width: '100%',
                  padding: theme.spacing.md,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius,
                }}
              >
                <option value="">All Entities</option>
                <option value="farmer">Farmer</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button onClick={handleExport} variant="success" fullWidth>
                📥 Export Reports (CSV)
              </Button>
            </div>
          </div>
        </Card>

        {/* Hotspot Map */}
        <MapView hotspots={mockHotspots} />

        {/* Data Verification Section */}
        <Card>
          <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Data Verification Engine
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.md }}>
            <div>
              <h4 style={{ marginBottom: theme.spacing.sm }}>Farmer Production Data</h4>
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
                  <div><strong>Hash:</strong> {farmer.hash}</div>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ marginBottom: theme.spacing.sm }}>Manufacturer Intake Data</h4>
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
                  <div><strong>Hash:</strong> {manufacturer.hash}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: theme.spacing.md, padding: theme.spacing.md, backgroundColor: theme.colors.success + '20', borderRadius: theme.borderRadius }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.success }}>
              {totalProduction === totalManufacturing ? '✅ MATCH' : '⚠️ MISMATCH'}
            </div>
            {totalProduction !== totalManufacturing && (
              <div style={{ marginTop: theme.spacing.sm }}>
                Difference: {Math.abs(totalProduction - totalManufacturing)} kg
              </div>
            )}
          </div>
          <div style={{ marginTop: theme.spacing.md, padding: theme.spacing.md, backgroundColor: theme.colors.background, borderRadius: theme.borderRadius }}>
            <strong>Status:</strong> Records locked (non-editable) | All logs are append-only
          </div>
        </Card>
      </div>
    </div>
  )
}

export default GovernmentDashboard

