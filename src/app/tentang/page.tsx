"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  Target,
  Eye,
  Github,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

// ============================================================
// MUDAH DIEDIT: Data Anggota Kelompok
// Cara ganti foto: upload file ke folder public/ lalu sesuaikan path di bawah
// Contoh: photo: "/farid.png" → taruh farid.png di folder public/
// ============================================================
const teamMembers = [
  {
    id: "26",
    name: "Farid Alfiyansah",
    role: "Project Manager & Frontend Developer",
    absen: 26,
    photo: "/farid.png",          // Upload foto ke: public/farid.png
    bio: "Mengoordinasikan tim dan mengembangkan antarmuka pengguna aplikasi SehatKita.",
    type: "human" as const,
  },
  {
    id: "31",
    name: "Halim",
    role: "Backend Developer",
    absen: 31,
    photo: "/halim.png",          // Upload foto ke: public/halim.png
    bio: "Bertanggung jawab atas arsitektur backend dan integrasi dengan Supabase.",
    type: "human" as const,
  },
  {
    id: "27",
    name: "Fauzan Yusuf",
    role: "UI/UX Designer",
    absen: 27,
    photo: "/fauzan.png",         // Upload foto ke: public/fauzan.png
    bio: "Mendesain pengalaman pengguna dan antarmuka yang ramah untuk semua usia.",
    type: "human" as const,
  },
  {
    id: "5",
    name: "Devino Bintang",
    role: "Full Stack Developer",
    absen: 5,
    photo: "/devino.png",         // Upload foto ke: public/devino.png
    bio: "Mengembangkan fitur-fitur utama aplikasi dari frontend hingga backend.",
    type: "human" as const,
  },
  {
    id: "4",
    name: "Denis Alfarizi",
    role: "QA & Testing",
    absen: 4,
    photo: "/denis.png",          // Upload foto ke: public/denis.png
    bio: "Memastikan kualitas aplikasi melalui pengujian menyeluruh.",
    type: "human" as const,
  },
  {
    id: "19",
    name: "Eka Ardiansah",
    role: "Content & Documentation",
    absen: 19,
    photo: "/eka.png",            // Upload foto ke: public/eka.png
    bio: "Menyusun konten edukasi kesehatan dan dokumentasi teknis aplikasi.",
    type: "human" as const,
  },
];

// ============================================================
// MUDAH DIEDIT: Data Anggota AI
// Logo diambil otomatis dari URL resmi masing-masing AI.
// brandColor: warna fallback jika logo gagal dimuat (hex tanpa #)
// ============================================================
const aiMembers = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "AI Language Model",
    company: "OpenAI",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
    bio: "Membantu tim dalam brainstorming ide fitur, penulisan konten, dan debugging kode.",
    brandColor: "10a37f",
    type: "ai" as const,
  },
  {
    id: "claude",
    name: "Claude AI",
    role: "AI Assistant",
    company: "Anthropic",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1024px-Claude_AI_logo.svg.png",
    bio: "Mendukung pengembangan fitur, review kode, dan menyusun dokumentasi teknis proyek.",
    brandColor: "d97757",
    type: "ai" as const,
  },
  {
    id: "grok",
    name: "Grok",
    role: "AI Assistant",
    company: "xAI",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Grok_logo.svg/1024px-Grok_logo.svg.png",
    bio: "Memberikan wawasan real-time dan analisis data untuk mendukung keputusan tim.",
    brandColor: "1d9bf0",
    type: "ai" as const,
  },
  {
    id: "gemini",
    name: "Gemini",
    role: "AI Language Model",
    company: "Google",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1024px-Google_Gemini_logo.svg.png",
    bio: "Membantu riset informasi kesehatan, terjemahan, dan optimasi konten aplikasi.",
    brandColor: "4285f4",
    type: "ai" as const,
  },
];

const stats = [
  { label: "Anggota Tim", value: "10", icon: Users },
  { label: "Fitur Utama", value: "8+", icon: Heart },
  { label: "Tech Stack", value: "10+", icon: Target },
];

export default function TentangPage() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-sehat-50/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang{" "}
              <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
                SehatKita
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              SehatKita adalah platform kesehatan keluarga yang dibuat untuk membantu
              masyarakat Indonesia memantau dan mengelola kesehatan keluarga dengan
              lebih mudah dan terintegrasi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sehat-500 to-kitablue-500 gap-2"
                >
                  Bergabung Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/harga">
                <Button size="lg" variant="outline">
                  Lihat Harga
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="p-3 rounded-xl bg-sehat-100 dark:bg-sehat-900/20 w-fit mb-4">
                  <Eye className="w-6 h-6 text-sehat-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Visi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadikan masyarakat Indonesia lebih sehat melalui teknologi
                  yang mudah diakses oleh semua kalangan usia, dengan fokus pada
                  pencegahan dan pemantauan kesehatan keluarga.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="p-3 rounded-xl bg-kitablue-100 dark:bg-kitablue-900/20 w-fit mb-4">
                  <Target className="w-6 h-6 text-kitablue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Misi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  1. Menyediakan platform kesehatan keluarga yang terintegrasi
                  dengan akses ke fasilitas kesehatan terdekat.
                  2. Meningkatkan kesadaran masyarakat akan pentingnya
                  pemantauan kesehatan rutin dan imunisasi.
                  3. Mempermudah akses informasi kesehatan yang akurat
                  dan terpercaya.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="p-3 rounded-xl bg-background w-fit mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-sehat-600" />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 container mx-auto px-4" ref={ref}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tim Pengembang</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Dibangun oleh tim siswa yang peduli akan kesehatan keluarga
              Indonesia, dengan dukungan teknologi AI terkini.
            </p>
          </div>

          {/* ── Anggota Kelompok ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
                Anggota Kelompok
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    isInView ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="h-24 bg-gradient-to-r from-sehat-400 to-kitablue-400" />
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-muted shadow-lg">
                          {/* Foto: taruh file di public/<nama>.png — lihat komentar di atas */}
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=128`;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-14 pb-6 px-6 text-center">
                      <Badge variant="secondary" className="mb-2">
                        Absen {member.absen}
                      </Badge>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-sehat-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Didukung oleh AI ── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
                Didukung oleh AI
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    isInView ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(teamMembers.length + index) * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="h-24 bg-gradient-to-r from-slate-400 to-slate-600" />
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-white shadow-lg flex items-center justify-center">
                          {/* Logo resmi masing-masing AI */}
                          <img
                            src={member.photo}
                            alt={`${member.name} logo`}
                            className="w-14 h-14 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${member.brandColor}&color=fff&size=128`;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-14 pb-6 px-6 text-center">
                      <Badge className="mb-2 bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                        {member.company}
                      </Badge>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-kitablue-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
              <p className="text-muted-foreground">
                Teknologi modern yang kami gunakan untuk membangun SehatKita
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { name: "Next.js 14", category: "Framework" },
                { name: "TypeScript", category: "Language" },
                { name: "Tailwind CSS", category: "Styling" },
                { name: "Supabase", category: "Database & Auth" },
                { name: "Leaflet.js", category: "Maps" },
                { name: "Recharts", category: "Charts" },
                { name: "shadcn/ui", category: "Components" },
                { name: "Zod", category: "Validation" },
              ].map((tech) => (
                <Card key={tech.name} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="font-semibold">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.category}</p>
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
