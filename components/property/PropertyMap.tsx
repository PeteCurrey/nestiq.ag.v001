"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/Button";
import { Plane, Map as MapIcon, School, Train, ShoppingCart, Trees, Utensils } from "lucide-react";
import { cn } from "@/lib/utils/cn";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  exactLocation?: boolean;
}

export function PropertyMap({ 
  lat = 53.2350, // Chesterfield default
  lng = -1.4273, // Chesterfield default
  exactLocation = true 
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [skyView, setSkyView] = useState(false);
  const [activeLayers, setActiveLayers] = useState<string[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: 15,
      pitch: 0,
    });


    map.current.on("load", () => {
      if (!map.current) return;

      if (exactLocation) {
        new mapboxgl.Marker({ color: "#1A6B4A" })
          .setLngLat([lng, lat])
          .addTo(map.current);
      } else {
        // Area circle for privacy
        map.current.addSource("area", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "Point", coordinates: [lng, lat] },
            properties: {},
          },
        });
        map.current.addLayer({
          id: "area-circle",
          type: "circle",
          source: "area",
          paint: {
            "circle-radius": {
              stops: [[0, 0], [20, 200]],
              base: 2
            },
            "circle-color": "#1A6B4A",
            "circle-opacity": 0.2,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#1A6B4A",
          },
        });
      }
    });

    return () => map.current?.remove();
  }, [lat, lng, exactLocation]);

  useEffect(() => {
    if (!map.current) return;
    
    if (skyView) {
      map.current.easeTo({
        pitch: 60,
        bearing: 0,
        duration: 2000,
      });

      let bearing = 0;
      const rotate = () => {
        if (!skyView) return;
        bearing = (bearing + 0.1) % 360;
        map.current?.setBearing(bearing);
        requestAnimationFrame(rotate);
      };
      rotate();
    } else {
      map.current.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 1000,
      });
    }
  }, [skyView]);

  const poiTypes = [
    { id: "schools", icon: <School className="w-4 h-4" />, label: "Schools" },
    { id: "stations", icon: <Train className="w-4 h-4" />, label: "Stations" },
    { id: "shops", icon: <ShoppingCart className="w-4 h-4" />, label: "Shops" },
    { id: "parks", icon: <Trees className="w-4 h-4" />, label: "Parks" },
  ];

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-xl bg-pearl">
      <div 
        ref={mapContainer} 
        className="w-full h-full mix-blend-multiply" 
        style={{ filter: "grayscale(30%) sepia(20%) hue-rotate(80deg) opacity(90%)" }}
      />
      
      {/* SkyView Toggle */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <Button
          variant={skyView ? "secondary" : "white"}
          size="sm"
          className="rounded-full shadow-lg"
          onClick={() => setSkyView(!skyView)}
        >
          <Plane className={cn("w-4 h-4 mr-2", skyView && "animate-pulse")} />
          {skyView ? "Exit SkyView" : "SkyView"}
        </Button>
        
        <Button
          variant="white"
          size="sm"
          className="rounded-full shadow-lg"
          onClick={() => {
             const currentStyle = map.current?.getStyle().name;
             map.current?.setStyle(currentStyle === 'Mapbox Satellite Streets' ? 'mapbox://styles/mapbox/streets-v12' : 'mapbox://styles/mapbox/satellite-streets-v12');
          }}
        >
          <MapIcon className="w-4 h-4 mr-2" />
          Satellite
        </Button>
      </div>

      {/* POI Toggles */}
      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
        {poiTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
               setActiveLayers(prev => prev.includes(type.id) ? prev.filter(l => l !== type.id) : [...prev, type.id]);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-label font-bold uppercase tracking-widest shadow-md border transition-all",
              activeLayers.includes(type.id) ? "bg-forest text-white border-forest" : "bg-white text-muted border-border hover:border-forest"
            )}
          >
            {type.icon}
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
