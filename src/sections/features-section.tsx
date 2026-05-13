"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Pill,
  Stethoscope,
  MapPin,
  BookOpen,
  Shield,
  Activity,
  Calendar,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const features = [
  {
    icon: Users,
    title: "Profil Keluarga",
    description:
      "Kelola profil kesehatan seluruh anggota keluarga dalam satu tempat yang aman.",
    color: "from-sehat-400 to-sehat-600",
  },
  {
    icon: Pill,
    title: "Reminder Obat & Imunisasi",
    description:
      "Jadwalkan dan dapatkan pengingat untuk minum obat dan jadwal imunisasi.",
    color: "from-kitablue-400 to-kitablue-600",
  },
  {
    icon: Stethoscope,
    title: "Cek Gejala",
    description:
      "Periksa gejala penyakit secara sederhana dan dapatkan rekomendasi awal.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description:
      "Evaluasi risiko kesehatan berdasarkan gaya hidup dan riwayat kesehatan.",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: MapPin,
    title: "Peta Faskes",
    description:
      "Temukan puskesmas, rumah sakit, dan apotek terdekat dengan mudah.",
    color: "from-red-400 to-red-600",
  },
  {
    icon: BookOpen,
    title: "Edukasi Kesehatan",
    description:
      "Akses artikel kesehatan terpercaya untuk pengetahuan keluarga Anda.",
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: Activity,
    title: "Laporan Bulanan",
    description:
      "Lihat grafik dan laporan perkembangan kesehatan keluarga setiap bulan.",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: Calendar,
    title: "Kalender Kesehatan",
    description:
      "Pantau jadwal checkup, vaksinasi, dan janji dokter dalam satu kalender.",
    color: "from-cyan-400 to-cyan-600",
  },
];

export function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="features" className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Semua yang Anda Butuhkan untuk{" "}
            <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
              Kesehatan Keluarga
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fitur lengkap yang dirancang khusus untuk membantu keluarga
            Indonesia menjaga kesehatan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group hover:shadow-lg transition-all duration-300 border-transparent hover:border-sehat-200 dark:hover:border-sehat-800 ${
                isInView
                  ? "animate-fade-in"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
