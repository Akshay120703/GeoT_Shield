// Mock data for simulation
export const mockFarmers = [
  {
    id: 'F001',
    name: 'John Doe',
    farmId: 'FARM-001',
    cropType: 'Virginia Tobacco',
    quantity: 500,
    harvestDate: '2024-01-15',
    gpsLocation: { lat: 28.7041, lng: 77.1025 },
    hash: '0xabc123...',
    status: 'Awaiting Manufacturer Match',
  },
]

export const mockManufacturers = [
  {
    id: 'M001',
    manufacturerId: 'MANU-001',
    factoryLocation: { lat: 28.6139, lng: 77.2090 },
    batchNumber: 'BATCH-2024-001',
    rawMaterialSource: '0xabc123...',
    quantityReceived: 500,
    productType: 'Cigarettes',
    hash: '0xdef456...',
  },
]

export const mockVolunteers = [
  {
    id: 'V001',
    name: 'Jane Smith',
    reports: [
      {
        id: 'R001',
        photo: null,
        gpsLocation: { lat: 28.5355, lng: 77.3910 },
        timestamp: '2024-01-20T10:30:00Z',
        description: 'Illicit tobacco activity detected',
      },
    ],
  },
]

export const mockHotspots = [
  { id: 'H001', lat: 28.5355, lng: 77.3910, severity: 'high', timestamp: '2024-01-20T10:30:00Z' },
  { id: 'H002', lat: 28.6139, lng: 77.2090, severity: 'medium', timestamp: '2024-01-19T14:20:00Z' },
  { id: 'H003', lat: 28.7041, lng: 77.1025, severity: 'low', timestamp: '2024-01-18T09:15:00Z' },
]

export const mockAuditLogs = [
  { id: 'A001', actor: 'F001', action: 'Production Record Submitted', timestamp: '2024-01-15T08:00:00Z' },
  { id: 'A002', actor: 'M001', action: 'Manufacturing Record Created', timestamp: '2024-01-16T10:00:00Z' },
  { id: 'A003', actor: 'V001', action: 'Hotspot Report Submitted', timestamp: '2024-01-20T10:30:00Z' },
]

