"use client";

import { UserPlus, HeartPulse, Bell } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const steps = [
  {
    icon: UserPlus,
    title: "Daftar & Buat Profil",
    description:
      "Buat akun gratis dan tambahkan profil anggota keluarga Anda dengan data kesehatan dasar.",
    color: "bg-sehat-500",
  },
  {
    icon: HeartPulse,
    title: "Pantau Kesehatan",
    description:
      "Catat riwayat kesehatan, checkup, dan gejala untuk setiap anggota keluarga.",
    color: "bg-kitablue-500",
  },
  {
    icon: Bell,
    title: "Dapatkan Pengingat",
    description:
      "Terima notifikasi untuk jadwal imunisasi, minum obat, dan janji dokter.",
    color: "bg-purple-500",
  },
];

export function HowItWorksSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sehat-50/30 dark:to-sehat-900/10" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Kerja{" "}
            <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
              SehatKita
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tiga langkah mudah untuk mulai menjaga kesehatan keluarga Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-sehat-300 via-kitablue-300 to-purple-300" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative text-center ${
                isInView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}
              >
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-background border-2 border-sehat-300 flex items-center justify-center mx-auto mb-4 font-bold text-sm text-sehat-600">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
