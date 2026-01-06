# Geotobacco Shield - Frontend Prototype

A demonstration prototype for a tobacco supply chain tracking application with role-based access for Farmers, Manufacturers, Volunteers, and Government Officials.

## Features

- **Role-Based Access Control**: Four distinct user roles with separate workflows
- **Farmer Module**: Production record submission with GPS simulation
- **Manufacturer Module**: Manufacturing record creation with quantity matching
- **Volunteer Module**: Illicit hotspot reporting with map visualization
- **Government Dashboard**: Comprehensive data overview with verification engine
- **Blockchain-Inspired UI**: Visual representation of hash-based records
- **Audit Trail**: Simulated logging of all interactions

## Tech Stack

- React 18
- React Router DOM
- Vite
- Pure CSS (no external UI libraries)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Role-specific screens
├── styles/         # Theme and styling
├── data/          # Mock data
└── utils/         # Utility functions
```

## Usage

1. The app starts with a splash screen
2. Select a role from the role selection screen
3. Login with any credentials (simulated)
4. Navigate through the role-specific dashboard
5. All data is simulated - no backend required

## Notes

- All GPS, image upload, and blockchain features are simulated for UI demonstration
- No actual data persistence - uses sessionStorage for role management
- Designed for demonstration purposes only

