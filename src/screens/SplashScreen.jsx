import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import splashImage from '../assets/GeoTobacco_Shield.jpg'

const SplashScreen = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.8)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Fade-in and scale-in animation
    const fadeIn = setTimeout(() => {
      setOpacity(1)
      setScale(1)
    }, 100)

    // Start fade-out animation after 2.5 seconds
    const startFadeOut = setTimeout(() => {
      setFadeOut(true)
      setOpacity(0)
      setScale(1.1)
    }, 2500)

    // Complete transition after fade-out
    const transition = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(fadeIn)
      clearTimeout(startFadeOut)
      clearTimeout(transition)
    }
  }, [onComplete])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        transition: fadeOut ? 'opacity 0.5s ease-out, transform 0.5s ease-out' : 'opacity 0.8s ease-in, transform 0.8s ease-in',
        opacity: opacity,
        transform: `scale(${scale})`,
      }}
    >
      <img
        src={splashImage}
        alt="GeoTobacco Shield"
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          borderRadius: theme.borderRadius,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  )
}

export default SplashScreen

