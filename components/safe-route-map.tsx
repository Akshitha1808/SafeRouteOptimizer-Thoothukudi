"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { SafeRoute, SafeSpot, CrimeHotspot } from "@/lib/types"
import { getSafeSpots, getCrimeHotspots } from "@/lib/data-service"

// This would normally come from an environment variable
// For this example, we're hardcoding it, but in a real app you should use:
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

interface SafeRouteMapProps {
  selectedRoute: SafeRoute | null
}

export default function SafeRouteMap({ selectedRoute }: SafeRouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [safeSpots, setSafeSpots] = useState<SafeSpot[]>([])
  const [crimeHotspots, setCrimeHotspots] = useState<CrimeHotspot[]>([])

  // Initialize map
  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.1348, 8.7642], // Thoothukudi coordinates
      zoom: 13,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    // Fetch safe spots and crime hotspots
    const fetchData = async () => {
      const spots = await getSafeSpots()
      const hotspots = await getCrimeHotspots()
      setSafeSpots(spots)
      setCrimeHotspots(hotspots)
    }

    fetchData()

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add safe spots to map
  useEffect(() => {
    if (!map.current || !safeSpots.length) return

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".safe-spot-marker")
    existingMarkers.forEach((marker) => marker.remove())

    safeSpots.forEach((spot) => {
      const el = document.createElement("div")
      el.className = "safe-spot-marker"
      el.style.width = "20px"
      el.style.height = "20px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = spot.type === "hospital" ? "#10b981" : "#3b82f6"
      el.style.border = "2px solid white"

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${spot.name}</strong><p>${spot.type}</p>`)

      new mapboxgl.Marker(el).setLngLat([spot.longitude, spot.latitude]).setPopup(popup).addTo(map.current!)
    })
  }, [safeSpots])

  // Display selected route
  useEffect(() => {
    if (!map.current || !selectedRoute) return

    // Remove previous route if exists
    if (map.current.getSource("route")) {
      map.current.removeLayer("route-line")
      map.current.removeSource("route")
    }

    // Add the route to the map
    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: selectedRoute.coordinates,
        },
      },
    })

    map.current.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#4ade80",
        "line-width": 6,
        "line-opacity": 0.8,
      },
    })

    // Fit the map to the route
    const bounds = new mapboxgl.LngLatBounds()
    selectedRoute.coordinates.forEach((coord) => {
      bounds.extend(coord as [number, number])
    })

    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
    })

    // Show start and end markers
    const startCoord = selectedRoute.coordinates[0] as [number, number]
    const endCoord = selectedRoute.coordinates[selectedRoute.coordinates.length - 1] as [number, number]

    // Start marker
    const startEl = document.createElement("div")
    startEl.className = "route-marker start-marker"
    startEl.style.width = "20px"
    startEl.style.height = "20px"
    startEl.style.borderRadius = "50%"
    startEl.style.backgroundColor = "#22c55e"
    startEl.style.border = "2px solid white"

    new mapboxgl.Marker(startEl)
      .setLngLat(startCoord)
      .setPopup(new mapboxgl.Popup().setText("Start"))
      .addTo(map.current)

    // End marker
    const endEl = document.createElement("div")
    endEl.className = "route-marker end-marker"
    endEl.style.width = "20px"
    endEl.style.height = "20px"
    endEl.style.borderRadius = "50%"
    endEl.style.backgroundColor = "#ef4444"
    endEl.style.border = "2px solid white"

    new mapboxgl.Marker(endEl)
      .setLngLat(endCoord)
      .setPopup(new mapboxgl.Popup().setText("Destination"))
      .addTo(map.current)
  }, [selectedRoute])

  return <div ref={mapContainer} className="w-full h-full" />
}

