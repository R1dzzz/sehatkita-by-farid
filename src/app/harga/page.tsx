"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Crown,
  Users,
  Zap,
  Heart,
  Activity,
  Shield,
} from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Gratis",
    description: "Cocok untuk mencoba SehatKita",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Heart,
    color: "from-gray-400 to-gray-500",
    popular: false,
    features: [
      { text: "Hingga 3 anggota keluarga", included: true },
      { text: "Reminder dasar", included: true },
      { text: "Cek gejala sederhana", included: true },
      { text: "Peta faskes terdekat", included: true },
      { text: "Edukasi kesehatan", included: true },
      { text: "Reminder tak terbatas", included: false },
      { text: "Risk assessment lanjutan", included: false },
      { text: "Laporan bulanan detail", included: false },
      { text: "Support prioritas", included: false },
      { text: "Export data", included: false },
    ],
  },
  {
    name: "Premium",
    description: "Untuk keluarga yang serius tentang kesehatan",
    monthlyPrice: 49000,
    yearlyPrice: 499000,
    icon: Zap,
    color: "from-sehat-500 to-kitablue-500",
    popular: true,
    features: [
      { text: "Hingga 8 anggota keluarga", included: true },
      { text: "Reminder tak terbatas", included: true },
      { text: "Cek gejala sederhana", included: true },
      { text: "Peta faskes terdekat", included: true },
      { text: "Edukasi kesehatan", included: true },
      { text: "Risk assessment lanjutan", included: true },
      { text: "Laporan bulanan detail", included: true },
      { text: "Grafik BMI & berat", included: true },
      { text: "Support email", included: true },
      { text: "Export data PDF", included: false },
    ],
  },
  {
    name: "Keluarga",
    description: "Untuk keluarga besar & profesional kesehatan",
    monthlyPrice: 99000,
    yearlyPrice: 999000,
    icon: Crown,
    color: "from-yellow-400 to-orange-500",
    popular: false,
    features: [
      { text: "Anggota keluarga tak terbatas", included: true },
      { text: "Reminder tak terbatas", included: true },
      { text: "Semua fitur Premium", included: true },
      { text: "Export data PDF & Excel", included: true },
      { text: "API Access", included: true },
      { text: "Konsultasi online", included: true },
      { text: "Support 24/7", included: true },
      { text: "White-label option", included: true },
      { text: "Custom integration", included: true },
      { text: "Dedicated account manager", included: true },
    ],
  },
];

function formatPrice(price: number) {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function HargaPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-sehat-50/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Pilih Paket yang{" "}
              <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
                Sesuai
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Mulai gratis dan upgrade kapan saja. Tidak ada komitmen, batalkan kapan saja.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
              <Label htmlFor="billing-toggle" className={!yearly ? "font-semibold" : "text-muted-foreground"}>
                Bulanan
              </Label>
              <Switch
                id="billing-toggle"
                checked={yearly}
                onCheckedChange={setYearly}
              />
              <Label htmlFor="billing-toggle" className={yearly ? "font-semibold" : "text-muted-foreground"}>
                Tahunan
              </Label>
              {yearly && (
                <Badge variant="secondary" className="bg-sehat-100 text-sehat-700">
                  Hemat 15%
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden ${
                    plan.popular
                      ? "ring-2 ring-sehat-500 shadow-xl scale-105"
                      : "hover:shadow-lg transition-shadow"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-sehat-500 to-kitablue-500 text-white text-center py-1 text-sm font-medium">
                      Paling Populer
                    </div>
                  )}

                  <CardHeader className={`${plan.popular ? "pt-10" : ""} text-center pb-4`}>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <span className="text-3xl font-bold">
                        {formatPrice(
                          yearly ? plan.yearlyPrice : plan.monthlyPrice
                        )}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-muted-foreground">
                          /{yearly ? "tahun" : "bulan"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div
                          key={feature.text}
                          className="flex items-center gap-3"
                        >
                          {feature.included ? (
                            <div className="p-1 rounded-full bg-sehat-100 dark:bg-sehat-900/20 flex-shrink-0">
                              <Check className="w-3 h-3 text-sehat-600" />
                            </div>
                          ) : (
                            <div className="p-1 rounded-full bg-muted flex-shrink-0">
                              <X className="w-3 h-3 text-muted-foreground" />
                            </div>
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? ""
                                : "text-muted-foreground line-through"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href="/auth/register">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-sehat-500 to-kitablue-500 text-white hover:from-sehat-600 hover:to-kitablue-600"
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.monthlyPrice === 0 ? "Mulai Gratis" : "Pilih Paket"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-8">
              Pertanyaan Umum
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Apakah saya bisa mengganti paket nanti?",
                  a: "Ya, Anda bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku pada siklus billing berikutnya.",
                },
                {
                  q: "Apakah ada uji coba gratis?",
                  a: "Ya! Paket Gratis bisa Anda gunakan selamanya dengan fitur dasar. Untuk mencoba fitur Premium, Anda bisa mulai langsung dan batalkan kapan saja.",
                },
                {
                  q: "Bagaimana cara pembayaran?",
                  a: "Kami menerima pembayaran melalui transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit.",
                },
                {
                  q: "Apakah data saya aman?",
                  a: "Sangat aman. Kami menggunakan enkripsi end-to-end dan tidak menjual data pengguna kepada pihak ketiga.",
                },
              ].map((faq) => (
                <Card key={faq.q}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
