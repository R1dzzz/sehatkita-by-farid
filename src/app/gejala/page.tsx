"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Thermometer,
  Activity,
  Wind,
  Brain,
  Eye,
  Ear,
  Heart,
} from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  category: string;
  icon: any;
}

const symptoms: Symptom[] = [
  { id: "demam", label: "Demam", category: "umum", icon: Thermometer },
  { id: "batuk", label: "Batuk", category: "pernapasan", icon: Wind },
  { id: "pilek", label: "Pilek / Hidung tersumbat", category: "pernapasan", icon: Wind },
  { id: "sakit_tenggorokan", label: "Sakit tenggorokan", category: "pernapasan", icon: Wind },
  { id: "sakit_kepala", label: "Sakit kepala", category: "umum", icon: Brain },
  { id: "mual", label: "Mual / Muntah", category: "pencernaan", icon: Activity },
  { id: "diare", label: "Diare", category: "pencernaan", icon: Activity },
  { id: "nyeri_otot", label: "Nyeri otot", category: "umum", icon: Activity },
  { id: "kelelahan", label: "Kelelahan", category: "umum", icon: Brain },
  { id: "sesak_napas", label: "Sesak napas", category: "pernapasan", icon: Wind },
  { id: "ruam", label: "Ruam kulit", category: "kulit", icon: Eye },
  { id: "mata_merah", label: "Mata merah / gatal", category: "mata", icon: Eye },
  { id: "telinga_sakit", label: "Sakit telinga", category: "telinga", icon: Ear },
  { id: "nyeri_dada", label: "Nyeri dada", category: "jantung", icon: Heart },
  { id: "pusing", label: "Pusing", category: "umum", icon: Brain },
];

const commonConditions: Record<string, { name: string; severity: string; advice: string }> = {
  flu: {
    name: "Flu / Influenza",
    severity: "ringan",
    advice: "Istirahat yang cukup, minum banyak air, dan konsumsi obat pereda demam jika diperlukan. Jika gejala memburuk setelah 3 hari, segera konsultasi ke dokter.",
  },
  pilek: {
    name: "Common Cold / Pilek",
    severity: "ringan",
    advice: "Minum air hangat, istirahat, dan hindari makanan dingin. Biasanya sembuh dalam 3-7 hari.",
  },
  covid: {
    name: "COVID-19 (Kemungkinan)",
    severity: "sedang",
    advice: "Lakukan tes COVID-19. Isolasi diri dan konsultasi ke dokter. Pantau oksigen dan pernapasan.",
  },
  maag: {
    name: "Gangguan Pencernaan / Maag",
    severity: "ringan",
    advice: "Makan makanan yang mudah dicerna, hindari makanan pedas dan asam, konsumsi obat maag jika diperlukan.",
  },
  demam_berdarah: {
    name: "Demam Berdarah (Kemungkinan)",
    severity: "berat",
    advice: "SEGERA pergi ke dokter atau RS terdekat. Demam berdarah memerlukan penanganan medis segera.",
  },
  tipes: {
    name: "Tipes (Kemungkinan)",
    severity: "sedang",
    advice: "Lakukan pemeriksaan darah untuk konfirmasi. Diperlukan antibiotik dari dokter.",
  },
};

export default function GejalaPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<{
    conditions: string[];
    generalAdvice: string;
  } | null>(null);
  const [checking, setChecking] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => {
      // Simple symptom checker logic
      const conditions: string[] = [];
      let advice = "Istirahat yang cukup dan minum banyak air putih. Jika gejala tidak membaik dalam 2-3 hari, segera konsultasi ke dokter.";

      const hasFever = selectedSymptoms.includes("demam");
      const hasCough = selectedSymptoms.includes("batuk");
      const hasHeadache = selectedSymptoms.includes("sakit_kepala");
      const hasFatigue = selectedSymptoms.includes("kelelahan");
      const hasBreath = selectedSymptoms.includes("sesak_napas");
      const hasNausea = selectedSymptoms.includes("mual");
      const hasDiarrhea = selectedSymptoms.includes("diare");
      const hasMusclePain = selectedSymptoms.includes("nyeri_otot");
      const hasChestPain = selectedSymptoms.includes("nyeri_dada");

      if (hasFever && hasMusclePain && hasHeadache && hasFatigue) {
        conditions.push("demam_berdarah");
      }
      if (hasFever && hasCough && hasFatigue && hasHeadache) {
        conditions.push("covid");
      }
      if (hasCough && selectedSymptoms.includes("pilek") && !hasFever) {
        conditions.push("pilek");
      }
      if (hasCough && hasFever && hasHeadache && !hasBreath) {
        conditions.push("flu");
      }
      if (hasNausea && hasDiarrhea) {
        conditions.push("maag");
      }
      if (hasFever && hasNausea && hasHeadache && duration === "lebih_7") {
        conditions.push("tipes");
      }

      if (conditions.length === 0) {
        conditions.push("flu");
      }

      if (hasChestPain || hasBreath) {
        advice = "PERINGATAN: Nyeri dada dan sesak napas bisa menandakan kondisi serius. Segera pergi ke UGD / IGD terdekat.";
      }

      setResult({ conditions, generalAdvice: advice });
      setChecking(false);
    }, 1500);
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setSeverity("");
    setDuration("");
    setResult(null);
  };

  const groupedSymptoms = symptoms.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Symptom[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/20">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            Cek Gejala Sederhana
          </h1>
          <p className="text-muted-foreground mt-2">
            Pilih gejala yang Anda alami untuk mendapatkan informasi awal
          </p>
        </div>

        {!result ? (
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Alat ini hanya memberikan informasi awal dan bukan pengganti konsultasi dokter.
                Jika kondisi darurat, segera hubungi 119 atau pergi ke UGD terdekat.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Pilih Gejala</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(groupedSymptoms).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-medium text-sm text-muted-foreground mb-3 capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {items.map((symptom) => {
                        const Icon = symptom.icon;
                        const isSelected = selectedSymptoms.includes(symptom.id);
                        return (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-all ${
                              isSelected
                                ? "border-sehat-500 bg-sehat-50 dark:bg-sehat-900/20"
                                : "border-border hover:bg-accent"
                            }`}
                          >
                            <Checkbox checked={isSelected} />
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{symptom.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">2. Tingkat Keparahan</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={severity} onValueChange={setSeverity} className="space-y-2">
                    {[
                      { value: "ringan", label: "Ringan - Masih bisa beraktivitas" },
                      { value: "sedang", label: "Sedang - Aktivitas terbatas" },
                      { value: "berat", label: "Berat - Tidak bisa beraktivitas" },
                    ].map((s) => (
                      <div key={s.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={s.value} id={s.value} />
                        <Label htmlFor={s.value}>{s.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3. Durasi Gejala</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={duration} onValueChange={setDuration} className="space-y-2">
                    {[
                      { value: "1_3", label: "1-3 hari" },
                      { value: "4_7", label: "4-7 hari" },
                      { value: "lebih_7", label: "Lebih dari 7 hari" },
                    ].map((d) => (
                      <div key={d.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={d.value} id={d.value} />
                        <Label htmlFor={d.value}>{d.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={handleCheck}
              disabled={selectedSymptoms.length === 0 || checking}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-2"
              size="lg"
            >
              {checking ? "Menganalisis..." : "Periksa Gejala"}
              <Stethoscope className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sehat-500" />
                  Hasil Analisis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Berdasarkan gejala yang Anda pilih, berikut kemungkinan kondisi:
                  </p>
                  <div className="space-y-3">
                    {result.conditions.map((condId) => {
                      const cond = commonConditions[condId];
                      return (
                        <div
                          key={condId}
                          className="p-4 rounded-lg border bg-muted/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{cond.name}</h3>
                            <Badge
                              variant={
                                cond.severity === "berat"
                                  ? "destructive"
                                  : cond.severity === "sedang"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {cond.severity === "ringan"
                                ? "Ringan"
                                : cond.severity === "sedang"
                                ? "Sedang"
                                : "Berat"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {cond.advice}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Alert
                  variant={
                    result.generalAdvice.includes("PERINGATAN")
                      ? "destructive"
                      : "default"
                  }
                >
                  <AlertDescription>{result.generalAdvice}</AlertDescription>
                </Alert>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Disclaimer:
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Hasil ini bersifat informatif dan bukan diagnosis medis. Selalu konsultasikan
                    dengan dokter untuk diagnosis dan penanganan yang tepat.
                  </p>
                </div>

                <Button onClick={reset} variant="outline" className="w-full gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Periksa Lagi
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
