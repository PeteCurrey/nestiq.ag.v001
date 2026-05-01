"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Crosshair, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface SearchMapProps {
  properties: any[];
  onViewportChange?: (bounds: any) => void;
  onMarkerClick?: (id: string) => void;
}

export function SearchMap({ properties, onViewportChange, onMarkerClick }: SearchMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showSearchButton, setShowSearchButton] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-1.5491, 53.8008], // Leeds
      zoom: 12,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add source for properties
      map.current.addSource("properties", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: properties.map((p) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [p.lng, p.lat] },
            properties: { id: p.id, price: p.price },
          })),
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Cluster layer
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "properties",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#1A6B4A",
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 50, 40],
          "circle-opacity": 0.9,
        },
      });

      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "properties",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      // Unclustered pins
      // We'll use HTML markers for the price pins as requested
      updateMarkers();
    });

    map.current.on("moveend", () => {
      setShowSearchButton(true);
    });

    return () => map.current?.remove();
  }, []);

  useEffect(() => {
    updateMarkers();
  }, [properties]);

  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const updateMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Only add markers for unclustered points or when zoomed in
    properties.forEach((p) => {
      const el = document.createElement("div");
      el.className = "map-pin";
      el.innerHTML = `£${(p.price / 1000).toFixed(0)}k`;
      el.style.backgroundColor = "#1A6B4A";
      el.style.color = "white";
      el.style.padding = "4px 8px";
      el.style.borderRadius = "20px";
      el.style.fontSize = "11px";
      el.style.fontWeight = "bold";
      el.style.fontFamily = "monospace";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
      el.style.transition = "transform 0.2s";

      el.addEventListener("mouseenter", () => (el.style.transform = "scale(1.1)"));
      el.addEventListener("mouseleave", () => (el.style.transform = "scale(1)"));
      el.addEventListener("click", () => onMarkerClick?.(p.id));

      const marker = new mapboxgl.Marker(el)
        .setLngLat([p.lng, p.lat])
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Search this area button */}
      <AnimatePresence>
        {showSearchButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
          >
            <Button
              variant="white"
              size="sm"
              className="rounded-full shadow-lg border border-border"
              onClick={() => {
                setShowSearchButton(false);
                onViewportChange?.(map.current?.getBounds());
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Search this area
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Geolocation button */}
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition((pos) => {
            map.current?.flyTo({
              center: [pos.coords.longitude, pos.coords.latitude],
              zoom: 14,
            });
          });
        }}
        className="absolute bottom-10 right-6 z-10 bg-white p-3 rounded-full shadow-lg border border-border hover:bg-pearl transition-colors"
      >
        <Crosshair className="w-5 h-5 text-forest" />
      </button>
    </div>
  );
}
