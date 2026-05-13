"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, Star, Navigation } from "lucide-react";

// Fix Leaflet icon issues in Next.js
const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Colored markers for different facility types
const hospitalIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#ef4444;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20V10H4v10"/><path d="M12 20V4h4v16"/><path d="M20 20v-6h-4v6"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const puskesmasIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#22c55e;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const pharmacyIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#3b82f6;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 18-4-4 4-4"/><path d="M16 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const clinicIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#a855f7;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const selectedIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#f59e0b;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:4px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.4);animation:pulse 1.5s infinite;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function getIconForType(type: string, isSelected: boolean) {
  if (isSelected) return selectedIcon;
  switch (type) {
    case "hospital":
      return hospitalIcon;
    case "puskesmas":
      return puskesmasIcon;
    case "pharmacy":
      return pharmacyIcon;
    case "clinic":
      return clinicIcon;
    default:
      return defaultIcon;
  }
}

function MapUpdater({
  selectedFacility,
}: {
  selectedFacility: any;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedFacility) {
      map.setView(
        [selectedFacility.latitude, selectedFacility.longitude],
        16,
        { animate: true, duration: 0.5 }
      );
    }
  }, [selectedFacility, map]);

  return null;
}

interface HealthMapProps {
  facilities: any[];
  selectedFacility: any;
  onSelectFacility: (f: any) => void;
}

export default function HealthMap({
  facilities,
  selectedFacility,
  onSelectFacility,
}: HealthMapProps) {
  const center = useMemo(() => {
    if (selectedFacility) {
      return [selectedFacility.latitude, selectedFacility.longitude];
    }
    // Default to Surabaya center
    return [-7.28, 112.75];
  }, [selectedFacility]);

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater selectedFacility={selectedFacility} />
      {facilities.map((facility) => (
        <Marker
          key={facility.id}
          position={[facility.latitude, facility.longitude]}
          icon={getIconForType(
            facility.type,
            selectedFacility?.id === facility.id
          )}
          eventHandlers={{
            click: () => onSelectFacility(facility),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-base">{facility.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {facility.address}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs capitalize">
                  {facility.type}
                </Badge>
                {facility.is_24h && (
                  <Badge className="text-xs bg-green-600">24 Jam</Badge>
                )}
              </div>
              <div className="mt-3 space-y-1 text-sm">
                {facility.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {facility.phone}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {facility.operating_hours}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {facility.rating}/5
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {facility.services.slice(0, 3).map((s: string) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 bg-muted rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
