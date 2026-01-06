import React from 'react'
import { theme } from '../styles/theme'
import Card from './Card'

const HashDisplay = ({ previousHash, currentHash, timestamp, actorId }) => {
  return (
    <Card>
      <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
        Blockchain-Inspired Record
      </h3>
      <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
        <div style={{ marginBottom: theme.spacing.sm }}>
          <strong>Previous Hash:</strong> 
          <div style={{ color: theme.colors.textLight, wordBreak: 'break-all' }}>
            {previousHash || 'N/A (Genesis Block)'}
          </div>
        </div>
        <div style={{ marginBottom: theme.spacing.sm }}>
          <strong>Current Hash:</strong>
          <div style={{ color: theme.colors.primary, wordBreak: 'break-all' }}>
            {currentHash}
          </div>
        </div>
        <div style={{ marginBottom: theme.spacing.sm }}>
          <strong>Timestamp:</strong>
          <div style={{ color: theme.colors.textLight }}>
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>
        <div>
          <strong>Actor ID:</strong>
          <div style={{ color: theme.colors.textLight }}>{actorId}</div>
        </div>
      </div>
    </Card>
  )
}

export default HashDisplay

