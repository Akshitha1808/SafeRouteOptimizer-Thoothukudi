"use client"

import type { SafeRoute } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Shield } from "lucide-react"

interface RouteListProps {
  routes: SafeRoute[]
  onSelectRoute: (route: SafeRoute) => void
  selectedRouteId: string | undefined
}

export default function RouteList({ routes, onSelectRoute, selectedRouteId }: RouteListProps) {
  // Function to determine badge color based on safety percentage
  const getSafetyBadgeColor = (safetyPercentage: number) => {
    if (safetyPercentage >= 80) return "bg-green-500 hover:bg-green-600"
    if (safetyPercentage >= 60) return "bg-emerald-500 hover:bg-emerald-600"
    if (safetyPercentage >= 40) return "bg-yellow-500 hover:bg-yellow-600"
    return "bg-red-500 hover:bg-red-600"
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Safe Routes</h2>
      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
        {routes.map((route) => (
          <Card
            key={route.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedRouteId === route.id ? "border-primary ring-2 ring-primary/20" : ""
            }`}
            onClick={() => onSelectRoute(route)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{route.name}</h3>
                <Badge className={getSafetyBadgeColor(route.safetyPercentage)}>
                  <Shield className="w-3 h-3 mr-1" />
                  {route.safetyPercentage}% Safe
                </Badge>
              </div>

              <div className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{route.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{route.distance} km</span>
                </div>
              </div>

              <div className="mt-3 text-xs">
                <p>
                  <span className="font-medium">Safe spots:</span> {route.safeSpots.join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

