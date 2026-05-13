"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Hospital,
  Pill,
  Stethoscope,
  Navigation,
  Cross,
  Search,
} from "lucide-react";

// Dynamically import Leaflet components to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/health-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <div className="w-8 h-8 border-4 border-sehat-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface HealthFacility {
  id: string;
  name: string;
  type: "hospital" | "clinic" | "pharmacy" | "puskesmas";
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  operating_hours: string;
  services: string[];
  is_24h: boolean;
  rating: number;
  distance?: string;
}

const facilities: HealthFacility[] = [
  {
    id: "1",
    name: "RSUD Dr. Soetomo",
    type: "hospital",
    address: "Jl. Mayjen Prof. Dr. Moestopo 6-8, Surabaya",
    phone: "(031) 5501001",
    latitude: -7.2685,
    longitude: 112.758,
    operating_hours: "24 Jam",
    services: ["IGD", "Rawat Inap", "Spesialis", "Laboratorium", "Radiologi"],
    is_24h: true,
    rating: 4.5,
    distance: "2.5 km",
  },
  {
    id: "2",
    name: "Puskesmas Wonokromo",
    type: "puskesmas",
    address: "Jl. Wonokromo, Surabaya",
    phone: "(031) 5678901",
    latitude: -7.3023,
    longitude: 112.7348,
    operating_hours: "08:00 - 16:00",
    services: ["Pemeriksaan Umum", "Imunisasi", "KIA", "Laboratorium Dasar"],
    is_24h: false,
    rating: 4.0,
    distance: "1.2 km",
  },
  {
    id: "3",
    name: "Apotek K24",
    type: "pharmacy",
    address: "Jl. Dharmahusada Indah Utara 45, Surabaya",
    phone: "(031) 5917524",
    latitude: -7.276,
    longitude: 112.77,
    operating_hours: "24 Jam",
    services: ["Obat Bebas", "Obat Resep", "Konsultasi Farmasi"],
    is_24h: true,
    rating: 4.3,
    distance: "0.8 km",
  },
  {
    id: "4",
    name: "Klinik Pratama Sehat",
    type: "clinic",
    address: "Jl. Raya Darmo Permai Selatan 12, Surabaya",
    phone: "(031) 7310001",
    latitude: -7.29,
    longitude: 112.74,
    operating_hours: "07:00 - 21:00",
    services: ["Pemeriksaan Umum", "Spesialis Anak", "USG", "Vaksinasi"],
    is_24h: false,
    rating: 4.2,
    distance: "1.8 km",
  },
  {
    id: "5",
    name: "RS Siloam",
    type: "hospital",
    address: "Jl. Raya Gubeng 70, Surabaya",
    phone: "(031) 5033999",
    latitude: -7.275,
    longitude: 112.755,
    operating_hours: "24 Jam",
    services: ["IGD", "Rawat Inap", "Spesialis", "MRI", "CT Scan"],
    is_24h: true,
    rating: 4.6,
    distance: "3.1 km",
  },
  {
    id: "6",
    name: "Apotek Kimia Farma",
    type: "pharmacy",
    address: "Jl. Pemuda 123, Surabaya",
    phone: "(031) 5310020",
    latitude: -7.265,
    longitude: 112.745,
    operating_hours: "08:00 - 22:00",
    services: ["Obat", "Alat Kesehatan", "Suplemen"],
    is_24h: false,
    rating: 4.1,
    distance: "2.0 km",
  },
];

const typeConfig = {
  hospital: { icon: Hospital, label: "Rumah Sakit", color: "bg-red-100 text-red-700 border-red-200" },
  puskesmas: { icon: Cross, label: "Puskesmas", color: "bg-green-100 text-green-700 border-green-200" },
  pharmacy: { icon: Pill, label: "Apotek", color: "bg-blue-100 text-blue-700 border-blue-200" },
  clinic: { icon: Stethoscope, label: "Klinik", color: "bg-purple-100 text-purple-700 border-purple-200" },
};

export default function PetaPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredFacilities = facilities.filter((f) => {
    const matchesFilter = filter === "all" || f.type === filter;
    const matchesSearch =
      search === "" ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <div className="lg:w-[400px] bg-background border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 text-sehat-600" />
                Fasilitas Kesehatan
              </h1>
              <p className="text-sm text-muted-foreground">
                Temukan faskes terdekat di lokasi Anda
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari nama atau alamat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Semua" },
                { key: "hospital", label: "RS" },
                { key: "puskesmas", label: "Puskesmas" },
                { key: "clinic", label: "Klinik" },
                { key: "pharmacy", label: "Apotek" },
              ].map((f) => (
                <Button
                  key={f.key}
                  variant={filter === f.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </Button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredFacilities.map((facility) => {
                const config = typeConfig[facility.type];
                const Icon = config.icon;
                return (
                  <Card
                    key={facility.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFacility?.id === facility.id
                        ? "ring-2 ring-sehat-500"
                        : ""
                    }`}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${config.color} flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">
                            {facility.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {facility.address}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {config.label}
                            </Badge>
                            {facility.is_24h && (
                              <Badge variant="default" className="text-xs bg-green-600">
                                24 Jam
                              </Badge>
                            )}
                            {facility.distance && (
                              <Badge variant="outline" className="text-xs">
                                {facility.distance}
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-xs text-yellow-600">
                              <Star className="w-3 h-3 fill-yellow-500" />
                              {facility.rating}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {facility.services.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-[10px] px-2 py-0.5 bg-muted rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {mounted && (
            <MapWithNoSSR
              facilities={filteredFacilities}
              selectedFacility={selectedFacility}
              onSelectFacility={setSelectedFacility}
            />
          )}
        </div>
      </main>
    </div>
  );
}
