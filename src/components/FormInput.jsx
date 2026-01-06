import React from 'react'
import { theme } from '../styles/theme'

const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  error,
  style = {},
  ...props 
}) => {
  const inputStyle = {
    width: '100%',
    padding: theme.spacing.md,
    fontSize: '16px',
    border: `2px solid ${error ? theme.colors.error : theme.colors.border}`,
    borderRadius: theme.borderRadius,
    marginTop: theme.spacing.sm,
    marginBottom: error ? theme.spacing.sm : theme.spacing.md,
    ...style,
  }

  return (
    <div style={{ width: '100%' }}>
      <label style={{ 
        display: 'block', 
        fontWeight: 'bold', 
        marginBottom: theme.spacing.xs,
        color: theme.colors.text,
      }}>
        {label} {required && <span style={{ color: theme.colors.error }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        {...props}
      />
      {error && (
        <div style={{ color: theme.colors.error, fontSize: '14px', marginTop: theme.spacing.xs }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default FormInput

