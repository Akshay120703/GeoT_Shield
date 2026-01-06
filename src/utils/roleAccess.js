// Role-based access control simulation
export const ROLES = {
  FARMER: 'farmer',
  MANUFACTURER: 'manufacturer',
  VOLUNTEER: 'volunteer',
  GOVERNMENT: 'government',
}

export const hasAccess = (userRole, requiredRole) => {
  return userRole === requiredRole
}

export const getRoleDisplayName = (role) => {
  const names = {
    [ROLES.FARMER]: 'Farmer',
    [ROLES.MANUFACTURER]: 'Manufacturer',
    [ROLES.VOLUNTEER]: 'Volunteer',
    [ROLES.GOVERNMENT]: 'Government Official',
  }
  return names[role] || role
}

