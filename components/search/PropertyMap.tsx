// components/search/PropertyMap.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false, loading: () => <Loader2 className="w-6 h-6 animate-spin" /> });

/**
 * PropertyMap displays an interactive map for a given latitude/longitude.
 * If coordinates are missing, a simple placeholder is rendered.
 */
export default function PropertyMap({ latitude, longitude }: { latitude?: number; longitude?: number }) {
  const [hasLocation, setHasLocation] = useState<boolean>(false);

  useEffect(() => {
    setHasLocation(typeof latitude === "number" && typeof longitude === "number");
  }, [latitude, longitude]);

  if (!hasLocation) {
    return (
      <div className="flex items-center justify-center h-64 bg-warm/10 rounded-lg">
        <p className="text-sm text-muted">Map unavailable – location not provided.</p>
      </div>
    );
  }

  return <LeafletMap latitude={latitude!} longitude={longitude!} />;
}

// LeafletMap.tsx (internal component, not exported directly)
const LeafletMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  // Import Leaflet styles lazily
  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <div
      id="leaflet-map"
      className="h-64 w-full rounded-lg"
      style={{ height: "400px" }}
    />
  );
};
