import React from 'react'
import { theme } from '../styles/theme'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style = {},
  ...props 
}) => {
  const baseStyle = {
    padding: size === 'large' ? '16px 32px' : size === 'small' ? '8px 16px' : '12px 24px',
    fontSize: size === 'large' ? '18px' : size === 'small' ? '14px' : '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: theme.borderRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    color: variant === 'primary' ? theme.colors.white : theme.colors.primary,
    backgroundColor: 
      variant === 'primary' ? theme.colors.primary :
      variant === 'secondary' ? theme.colors.secondary :
      variant === 'success' ? theme.colors.success :
      variant === 'warning' ? theme.colors.warning :
      variant === 'error' ? theme.colors.error :
      theme.colors.white,
    boxShadow: theme.boxShadow,
    ...style,
  }

  const hoverStyle = {
    ...baseStyle,
    boxShadow: theme.boxShadowHover,
    transform: 'translateY(-2px)',
  }

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <button
      style={isHovered && !disabled ? hoverStyle : baseStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

