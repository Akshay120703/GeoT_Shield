import React from 'react'
import { theme } from '../styles/theme'
import Card from './Card'

// Simulated map view with markers
const MapView = ({ hotspots = [], center = { lat: 28.6139, lng: 77.2090 } }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return theme.colors.error
      case 'medium': return theme.colors.warning
      case 'low': return theme.colors.success
      default: return theme.colors.textLight
    }
  }

  return (
    <Card>
      <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
        Hotspot Map View
      </h3>
      <div
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#E3F2FD',
          borderRadius: theme.borderRadius,
          position: 'relative',
          border: `2px solid ${theme.colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>🗺️</div>
        <div style={{ color: theme.colors.textLight, marginBottom: theme.spacing.lg }}>
          Map View (Simulated)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.sm }}>
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              style={{
                padding: theme.spacing.sm,
                backgroundColor: getSeverityColor(hotspot.severity),
                color: theme.colors.white,
                borderRadius: theme.borderRadius,
                fontSize: '12px',
              }}
            >
              {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: theme.spacing.md }}>
        <strong>Hotspots:</strong>
        <ul style={{ marginTop: theme.spacing.sm, paddingLeft: theme.spacing.lg }}>
          {hotspots.map((hotspot) => (
            <li key={hotspot.id} style={{ marginBottom: theme.spacing.xs }}>
              <span style={{ 
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: getSeverityColor(hotspot.severity),
                borderRadius: '50%',
                marginRight: theme.spacing.xs,
              }} />
              Severity: {hotspot.severity} | {new Date(hotspot.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default MapView

