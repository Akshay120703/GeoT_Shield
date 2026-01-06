import React from 'react'
import { theme } from '../styles/theme'
import Button from './Button'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  }

  const modalStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.xl,
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <h2 style={{ color: theme.colors.primary }}>{title}</h2>
          <Button onClick={onClose} variant="secondary" size="small">✕</Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal

