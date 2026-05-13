"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  User,
  Search,
  Heart,
  Baby,
  Apple,
  Brain,
  Activity,
  Shield,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: number;
  icon: any;
  color: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Panduan Imunisasi Lengkap untuk Anak",
    excerpt: "Jadwal dan jenis vaksin yang wajib diberikan kepada anak sejak lahir hingga usia 5 tahun.",
    content: `Imunisasi adalah pemberian vaksin untuk melindungi anak dari penyakit menular berbahaya. Berikut jadwal imunisasi lengkap sesuai standar IDAI (Ikatan Dokter Anak Indonesia):

**Neonatal (0-24 jam):**
- Hepatitis B pertama
- BCG (Tuberkulosis)
- Polio tetes pertama

**Usia 2 bulan:**
- DTP-HB-Hib pertama
- Polio tetes kedua
- PCV pertama
- Rotavirus pertama

**Usia 3 bulan:**
- DTP-HB-Hib kedua
- Polio suntik pertama (IPV)

**Usia 4 bulan:**
- DTP-HB-Hib ketiga
- Polio tetes ketiga
- PCV kedua
- Rotavirus kedua

Penting untuk selalu membawa buku imunisasi anak setiap kali berkunjung ke fasilitas kesehatan.`,
    category: "anak",
    author: "Dr. Sari Wulandari, Sp.A",
    readTime: 8,
    icon: Baby,
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "2",
    title: "Cegah Penyakit Jantung dengan Gaya Hidup Sehat",
    excerpt: "Tips dan strategi menjaga kesehatan jantung melalui pola makan dan olahraga yang tepat.",
    content: `Penyakit jantung merupakan salah satu penyebab kematian tertinggi di Indonesia. Namun, sebagian besar penyakit jantung dapat dicegah dengan gaya hidup sehat.

**1. Pola Makan Sehat:**
- Kurangi garam (maksimal 1 sendok teh/hari)
- Batasi lemak jenuh dan lemak trans
- Perbanyak serat dari sayur dan buah
- Pilih protein tanpa lemak seperti ikan dan kacang-kacangan

**2. Olahraga Teratur:**
- Minimal 150 menit per minggu aktivitas sedang
- Contoh: jalan cepat, bersepeda, berenang
- Lakukan paling tidak 30 menit per hari, 5 kali seminggu

**3. Berhenti Merokok:**
- Merokok meningkatkan risiko penyakit jantung 2-4 kali lipat
- Manfaat berhenti merokok mulai terasa dalam 24 jam

**4. Kelola Stres:**
- Stres kronis dapat meningkatkan tekanan darah
- Lakukan meditasi, yoga, atau hobi yang menyenangkan`,
    category: "dewasa",
    author: "Dr. Budi Santoso, Sp.JP",
    readTime: 6,
    icon: Heart,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "3",
    title: "Nutrisi Seimbang untuk Lansia",
    excerpt: "Panduan makanan bergizi yang dibutuhkan oleh orang lanjut usia untuk tetap sehat.",
    content: `Lansia memiliki kebutuhan nutrisi yang berbeda dari usia dewasa. Pencernaan yang menurun dan perubahan metabolisme memerlukan penyesuaian pola makan.

**Kebutuhan Nutrisi Utama:**

**Protein:**
- Dibutuhkan untuk menjaga massa otot
- Sumber: telur, ikan, tahu, tempe, kacang-kacangan
- Target: 1-1,2 gram/kg berat badan per hari

**Kalsium & Vitamin D:**
- Penting untuk kesehatan tulang
- Sumber kalsium: susu, yoghurt, sayuran berdaun hijau
- Vitamin D dari sinar matahari pagi (15-20 menit)

**Serat:**
- Mencegah sembelit yang umum terjadi pada lansia
- Sumber: sayur, buah, gandum utuh

**Cairan:**
- Minum minimal 8 gelas per hari
- Kurangi kopi dan teh berlebihan

**Tips Tambahan:**
- Makan dalam porsi kecil tapi sering (5-6 kali/hari)
- Hindari makanan tinggi garam dan gula
- Konsumsi suplemen jika diperlukan sesuai anjuran dokter`,
    category: "lansia",
    author: "Dr. Rina Kusuma, Sp.GK",
    readTime: 7,
    icon: Apple,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "4",
    title: "Mengenal Diabetes Melitus: Gejala dan Pencegahan",
    excerpt: "Pahami tanda-tanda diabetes sejak dini dan cara mencegahnya dengan pola hidup yang benar.",
    content: `Diabetes Melitus adalah penyakit kronis yang ditandai dengan kadar gula darah tinggi. Ada dua tipe utama: Tipe 1 (autoimun) dan Tipe 2 (gaya hidup).

**Gejala Umum:**
- Sering haus dan sering buang air kecil
- Penurunan berat badan tanpa sebab
- Mudah lelah dan lesu
- Penglihatan kabur
- Luka yang sulit sembuh

**Faktor Risiko Tipe 2:**
- Kegemukan / obesitas
- Kurang aktivitas fisik
- Riwayat keluarga diabetes
- Usia di atas 40 tahun
- Tekanan darah tinggi
- Kolesterol tinggi

**Pencegahan:**
1. Jaga berat badan ideal (BMI 18,5-24,9)
2. Olahraga minimal 30 menit per hari
3. Pola makan rendah gula dan karbohidrat sederhana
4. Perbanyak serat dari sayur dan buah
5. Medical checkup gula darah rutin setiap 6 bulan

**Pemeriksaan:**
- Gula darah puasa: normal <100 mg/dL
- Gula darah 2 jam PP: normal <140 mg/dL
- HbA1c: normal <5,7%`,
    category: "dewasa",
    author: "Dr. Ahmad Fauzi, Sp.PD",
    readTime: 5,
    icon: Activity,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "5",
    title: "Stres dan Kesehatan Mental: Kapan Harus ke Dokter?",
    excerpt: "Kenali tanda-tanda gangguan mental dan pahami kapan waktu yang tepat untuk mencari bantuan profesional.",
    content: `Kesehatan mental sama pentingnya dengan kesehatan fisik. Stres yang berkepanjangan dapat memicu berbagai masalah kesehatan.

**Tanda-tanda Perlu Waspada:**
- Perubahan mood yang drastis
- Sulit tidur atau tidur berlebihan
- Kehilangan minat pada aktivitas yang biasa disukai
- Isolasi diri dari keluarga dan teman
- Kesulitan berkonsentrasi
- Pikiran untuk menyakiti diri sendiri

**Coping Strategies:**
1. **Mindfulness & Meditasi:** 10-15 menit per hari
2. **Olahraga:** Melepaskan endorfin yang meningkatkan mood
3. **Jurnal:** Menulis perasaan untuk mengurangi beban pikiran
4. **Social Support:** Berbicara dengan orang terdekat
5. **Hobby:** Lakukan aktivitas yang menyenangkan

**Kapan ke Psikiater/Psikolog:**
- Gejala berlangsung lebih dari 2 minggu
- Mengganggu aktivitas sehari-hari
- Ada ide untuk menyakiti diri
- Mengalami halusinasi atau delusi
- Ketergantungan zat (alkohol, narkoba)

**Hotline Kesehatan Mental:**
- Layanan Kesehatan Jiwa: 119 ext 8
- Save Yourselves: 021-2789-1234
- Into The Light: 0811-825-998`,
    category: "mental",
    author: "Dr. Maya Indah, Sp.KJ",
    readTime: 6,
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "6",
    title: "Pentingnya Vitamin D dan Cara Mendapatkannya",
    excerpt: "Vitamin D esensial untuk kesehatan tulang dan imunitas. Pelajari cara memenuhi kebutuhan harian.",
    content: `Vitamin D memegang peranan penting dalam kesehatan tubuh, mulai dari penyerapan kalsium hingga sistem kekebalan tubuh.

**Fungsi Vitamin D:**
- Membantu penyerapan kalsium dan fosfor
- Menguatkan tulang dan gigi
- Mendukung sistem kekebalan tubuh
- Mengurangi risiko penyakit autoimun
- Mendukung kesehatan mental

**Sumber Vitamin D:**

**Sinar Matahari:**
- Paparan sinar matahari pagi (jam 10 sebelumnya)
- 15-20 menit per hari untuk kulit terang
- 30-40 menit per hari untuk kulit gelap

**Makanan:**
- Ikan berlemak (salmon, tuna, sarden)
- Kuning telur
- Jamur yang terpapar sinar UV
- Susu dan sereal yang difortifikasi

**Suplemen:**
- Dosis harian: 400-800 IU (sesuai usia)
- Konsultasi dokter untuk dosis yang tepat

**Tanda Kekurangan:**
- Nyeri otot dan tulang
- Kelelahan kronis
- Mudah jatuh sakit
- Depresi
- Rambut rontok

**Siapa yang Berisiko Kekurangan:**
- Orang yang jarang keluar rumah
- Lansia
- Orang berkulit gelap
- Penderita obesitas
- Vegetarian ketat`,
    category: "dewasa",
    author: "Dr. Dian Pratiwi, Sp.GK",
    readTime: 5,
    icon: Shield,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const categories = [
  { key: "all", label: "Semua" },
  { key: "anak", label: "Kesehatan Anak" },
  { key: "dewasa", label: "Kesehatan Dewasa" },
  { key: "lansia", label: "Kesehatan Lansia" },
  { key: "mental", label: "Kesehatan Mental" },
];

export default function EdukasiPage() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = (category: string) => {
    return articles.filter((a) => {
      const matchesCategory = category === "all" || a.category === category;
      const matchesSearch =
        search === "" ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/20">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            Edukasi Kesehatan
          </h1>
          <p className="text-muted-foreground mt-2">
            Kumpulan artikel kesehatan terpercaya untuk keluarga Indonesia
          </p>
        </div>

        {selectedArticle ? (
          <div className="max-w-3xl mx-auto">
            <Button variant="outline" onClick={() => setSelectedArticle(null)} className="mb-4">
              Kembali ke Daftar
            </Button>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${selectedArticle.color}`}>
                    <selectedArticle.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-1 capitalize">
                      {selectedArticle.category}
                    </Badge>
                    <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedArticle.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedArticle.readTime} menit baca
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari artikel kesehatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all">
              <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
                {categories.map((c) => (
                  <TabsTrigger key={c.key} value={c.key} className="text-sm">
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((c) => (
                <TabsContent key={c.key} value={c.key}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredArticles(c.key).map((article) => {
                      const Icon = article.icon;
                      return (
                        <Card
                          key={article.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl ${article.color} flex-shrink-0`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <Badge variant="secondary" className="mb-2 text-xs capitalize">
                                  {article.category}
                                </Badge>
                                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {article.author}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime} menit
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  {filteredArticles(c.key).length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Tidak ada artikel ditemukan</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}
