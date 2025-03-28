export interface SafeRoute {
  id: string
  name: string
  safetyPercentage: number
  duration: number
  distance: number
  coordinates: [number, number][]
  safeSpots: string[]
}

export interface SafeSpot {
  id: string
  name: string
  type: "hospital" | "police" | "fire_station" | "public_building"
  latitude: number
  longitude: number
}

export interface CrimeHotspot {
  id: string
  type: string
  severity: number // 1-10 scale
  latitude: number
  longitude: number
  reportCount: number
}

