import React from 'react'
import { theme } from '../styles/theme'
import Card from './Card'

const AuditLog = ({ logs }) => {
  return (
    <Card>
      <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
        Audit Trail
      </h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {logs.map((log) => (
          <div
            key={log.id}
            style={{
              padding: theme.spacing.md,
              borderLeft: `4px solid ${theme.colors.primary}`,
              marginBottom: theme.spacing.sm,
              backgroundColor: theme.colors.background,
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: theme.spacing.xs }}>
              {log.action}
            </div>
            <div style={{ fontSize: '14px', color: theme.colors.textLight }}>
              Actor: {log.actor} | {new Date(log.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default AuditLog

