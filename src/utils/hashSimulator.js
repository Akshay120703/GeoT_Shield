// Simulate blockchain hash generation (for UI display only)
export const generateMockHash = (data) => {
  const str = JSON.stringify(data) + Date.now()
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return `0x${Math.abs(hash).toString(16).padStart(16, '0')}...`
}

export const generatePreviousHash = () => {
  return `0x${Math.random().toString(16).substr(2, 16)}...`
}

