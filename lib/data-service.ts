import type { SafeSpot, CrimeHotspot } from "./types"

// Mock data for safe spots in Thoothukudi
export async function getSafeSpots(): Promise<SafeSpot[]> {
  // In a real app, this would fetch from a database or API
  return [
    {
      id: "spot1",
      name: "Thoothukudi Government Medical College Hospital",
      type: "hospital",
      latitude: 8.7642,
      longitude: 78.138,
    },
    {
      id: "spot2",
      name: "Thoothukudi Central Police Station",
      type: "police",
      latitude: 8.766,
      longitude: 78.142,
    },
    {
      id: "spot3",
      name: "Women's Police Station",
      type: "police",
      latitude: 8.77,
      longitude: 78.14,
    },
    {
      id: "spot4",
      name: "District Hospital",
      type: "hospital",
      latitude: 8.771,
      longitude: 78.143,
    },
    {
      id: "spot5",
      name: "Beach Road Police Outpost",
      type: "police",
      latitude: 8.76,
      longitude: 78.139,
    },
    {
      id: "spot6",
      name: "Fire and Rescue Station",
      type: "fire_station",
      latitude: 8.763,
      longitude: 78.141,
    },
    {
      id: "spot7",
      name: "District Collector Office",
      type: "public_building",
      latitude: 8.7665,
      longitude: 78.1365,
    },
    {
      id: "spot8",
      name: "Railway Police Station",
      type: "police",
      latitude: 8.7685,
      longitude: 78.1395,
    },
  ]
}

// Mock data for crime hotspots in Thoothukudi
export async function getCrimeHotspots(): Promise<CrimeHotspot[]> {
  // In a real app, this would fetch from a database or API with actual crime data
  // This is fictional data for demonstration purposes only
  return [
    {
      id: "hotspot1",
      type: "theft",
      severity: 6,
      latitude: 8.765,
      longitude: 78.141,
      reportCount: 12,
    },
    {
      id: "hotspot2",
      type: "harassment",
      severity: 7,
      latitude: 8.762,
      longitude: 78.136,
      reportCount: 8,
    },
    {
      id: "hotspot3",
      type: "assault",
      severity: 8,
      latitude: 8.763,
      longitude: 78.138,
      reportCount: 5,
    },
    {
      id: "hotspot4",
      type: "theft",
      severity: 5,
      latitude: 8.767,
      longitude: 78.137,
      reportCount: 15,
    },
    {
      id: "hotspot5",
      type: "harassment",
      severity: 6,
      latitude: 8.7695,
      longitude: 78.1425,
      reportCount: 7,
    },
  ]
}

