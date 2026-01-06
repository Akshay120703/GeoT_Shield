import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles/theme'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import Card from '../../components/Card'
import MapView from '../../components/MapView'
import { mockHotspots } from '../../data/mockData'

const VolunteerDashboard = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    photo: null,
    gpsLat: '',
    gpsLng: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleImageUpload = (e) => {
    // Simulate image upload (no actual file storage)
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, photo: file.name })
    }
  }

  const handleGPSCapture = () => {
    setFormData({
      ...formData,
      gpsLat: '28.5355',
      gpsLng: '77.3910',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ photo: null, gpsLat: '', gpsLng: '', description: '' })
    }, 3000)
  }

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
          <h1 style={{ color: theme.colors.primary }}>Volunteer Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            Logout
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.lg }}>
          <Card>
            <h2 style={{ color: theme.colors.primary, marginBottom: theme.spacing.lg }}>
              Report Illicit Hotspot
            </h2>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>✅</div>
                <h3 style={{ color: theme.colors.success }}>
                  Report Submitted to Government Dashboard!
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: theme.spacing.md }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>
                    Photo Upload (Simulated)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      width: '100%',
                      padding: theme.spacing.sm,
                      border: `2px solid ${theme.colors.border}`,
                      borderRadius: theme.borderRadius,
                    }}
                  />
                  {formData.photo && (
                    <div style={{ marginTop: theme.spacing.sm, color: theme.colors.success }}>
                      ✓ {formData.photo} (simulated)
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: theme.spacing.md }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: theme.spacing.xs }}>
                    GPS Location (Simulated Auto-Capture)
                  </label>
                  <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                    <FormInput
                      label="Latitude"
                      value={formData.gpsLat}
                      onChange={(e) => setFormData({ ...formData, gpsLat: e.target.value })}
                      style={{ flex: 1 }}
                    />
                    <FormInput
                      label="Longitude"
                      value={formData.gpsLng}
                      onChange={(e) => setFormData({ ...formData, gpsLng: e.target.value })}
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
                <FormInput
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the illicit activity..."
                />
                <Button type="submit" variant="primary" fullWidth>
                  Submit Report
                </Button>
              </form>
            )}
          </Card>

          <div>
            <MapView hotspots={mockHotspots} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerDashboard

