"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Shield, Clock, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sehat-50/50 via-kitablue-50/30 to-background py-16 md:py-24 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sehat-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kitablue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sehat-100 dark:bg-sehat-900/30 text-sehat-700 dark:text-sehat-300 text-sm font-medium">
              <Heart className="w-4 h-4" />
              Platform Kesehatan Keluarga #1 di Indonesia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Jaga Kesehatan{" "}
              <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
                Keluarga Anda
              </span>{" "}
              Bersama SehatKita
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Pantau kesehatan keluarga, atur jadwal imunisasi & obat, cek
              gejala penyakit, dan temukan fasilitas kesehatan terdekat — semua
              dalam satu platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sehat-500 to-kitablue-500 text-white hover:from-sehat-600 hover:to-kitablue-600 gap-2 shadow-lg shadow-sehat-500/25"
                >
                  Mulai Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tentang">
                <Button size="lg" variant="outline" className="gap-2">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-sehat-500" />
                Data Aman
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-kitablue-500" />
                24/7 Monitoring
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sehat-500" />
                Faskes Terdekat
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Card stack effect */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-2xl p-6 space-y-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sehat-400 to-kitablue-400 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Status Kesehatan</h3>
                      <p className="text-sm text-muted-foreground">
                        Keluarga Bintang
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Sehat
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Anggota", value: "4", color: "text-sehat-600" },
                    { label: "Reminder", value: "3", color: "text-kitablue-600" },
                    { label: "Checkup", value: "12", color: "text-purple-600" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-lg bg-muted"
                    >
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    { name: "Ayah", status: "Normal", color: "bg-green-500" },
                    { name: "Ibu", status: "Normal", color: "bg-green-500" },
                    { name: "Anak 1", status: "Imunisasi", color: "bg-yellow-500" },
                  ].map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                        <span className="text-sm font-medium">{member.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${member.color}`} />
                        <span className="text-xs text-muted-foreground">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-card rounded-xl shadow-lg p-4 border animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Imunisasi</p>
                    <p className="text-sm font-semibold">3 Hari Lagi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
