"use client"

import { useState } from "react"
import SafeRouteMap from "@/components/safe-route-map"
import RouteList from "@/components/route-list"
import { getSafeRoutes } from "@/lib/route-service"
import type { SafeRoute } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapIcon as MapSearch } from "lucide-react"

export default function Home() {
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [routes, setRoutes] = useState<SafeRoute[]>([])
  const [selectedRoute, setSelectedRoute] = useState<SafeRoute | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!source || !destination) return

    setIsLoading(true)
    try {
      const safeRoutes = await getSafeRoutes(source, destination)
      setRoutes(safeRoutes)
      setSelectedRoute(null)
    } catch (error) {
      console.error("Error fetching routes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectRoute = (route: SafeRoute) => {
    setSelectedRoute(route)
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <MapSearch className="h-6 w-6" />
              Safe Route Finder - Thoothukudi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <Input
                placeholder="Enter starting location"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading || !source || !destination}
                className="w-full md:w-auto"
              >
                {isLoading ? "Searching..." : "Find Safe Routes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-[350px_1fr]">
          {routes.length > 0 && (
            <RouteList routes={routes} onSelectRoute={handleSelectRoute} selectedRouteId={selectedRoute?.id} />
          )}
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <SafeRouteMap selectedRoute={selectedRoute} />
          </div>
        </div>
      </div>
    </main>
  )
}

