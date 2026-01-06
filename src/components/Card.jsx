import React from 'react'
import { theme } from '../styles/theme'

const Card = ({ children, onClick, style = {} }) => {
  const cardStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.lg,
    boxShadow: theme.boxShadow,
    marginBottom: theme.spacing.md,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    ...style,
  }

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      style={{
        ...cardStyle,
        ...(isHovered && onClick ? { 
          boxShadow: theme.boxShadowHover,
          transform: 'translateY(-2px)',
        } : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

export default Card

