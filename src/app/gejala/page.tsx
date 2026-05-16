"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Info,
} from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Disease {
  id: string;
  name: string;
  description: string | null;
  recommendation: string | null;
  severity?: string | null;
}

interface Symptom {
  id: string;
  name: string;
  category: string | null;
}

interface DiseaseSymptom {
  disease_id: string;
  symptom_id: string;
}

interface DiagnosisResult {
  disease: Disease;
  matchedCount: number;
  totalSymptoms: number;
  confidence: number;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GejalaPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [diseaseSymptoms, setDiseaseSymptoms] = useState<DiseaseSymptom[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");

  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [noMatchMessage, setNoMatchMessage] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = getSupabaseClient();

        const [
          { data: symptomsData, error: symptomsError },
          { data: diseasesData, error: diseasesError },
          { data: dsData, error: dsError },
        ] = await Promise.all([
          supabase.from("symptoms").select("id, name, category").order("category").order("name"),
          supabase.from("diseases").select("id, name, description, recommendation, severity"),
          supabase.from("disease_symptoms").select("disease_id, symptom_id"),
        ]);

        if (symptomsError) throw symptomsError;
        if (diseasesError) throw diseasesError;
        if (dsError) throw dsError;

        setSymptoms(symptomsData || []);
        setDiseases(diseasesData || []);
        setDiseaseSymptoms(dsData || []);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setDataError("Gagal memuat data gejala. Coba refresh halaman.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCheck = async () => {
    if (selectedSymptoms.length === 0) return;
    setChecking(true);

    // Hitung total symptoms per disease
    const diseaseTotalSymptoms: Record<string, number> = {};
    diseaseSymptoms.forEach(({ disease_id }) => {
      diseaseTotalSymptoms[disease_id] = (diseaseTotalSymptoms[disease_id] || 0) + 1;
    });

    // Hitung match score per disease dari selected symptoms
    const diseaseScores: Record<string, number> = {};
    selectedSymptoms.forEach((symptomId) => {
      diseaseSymptoms
        .filter((ds) => ds.symptom_id === symptomId)
        .forEach(({ disease_id }) => {
          diseaseScores[disease_id] = (diseaseScores[disease_id] || 0) + 1;
        });
    });

    // Susun hasil, filter min 20% confidence, sort descending, top 3
    const diagnosisResults: DiagnosisResult[] = Object.entries(diseaseScores)
      .map(([diseaseId, matchedCount]) => {
        const disease = diseases.find((d) => d.id === diseaseId);
        const totalSymptoms = diseaseTotalSymptoms[diseaseId] || 1;
        const confidence = Math.round((matchedCount / totalSymptoms) * 100);
        return { disease: disease!, matchedCount, totalSymptoms, confidence };
      })
      .filter((r) => r.disease != null && r.confidence >= 20)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    if (diagnosisResults.length === 0) {
      setNoMatchMessage(
        "Tidak ditemukan kondisi yang cocok dengan gejala yang dipilih. " +
        "Disarankan untuk konsultasi langsung dengan dokter."
      );
      setResults([]);
    } else {
      setNoMatchMessage(null);
      setResults(diagnosisResults);
    }

    // Simpan ke symptom_checks
    setSaving(true);
    try {
      const supabase = getSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const topResult = diagnosisResults[0];
      await supabase.from("symptom_checks").insert({
        user_id: user?.id ?? null,
        selected_symptoms: selectedSymptoms,
        predicted_disease: topResult?.disease?.name ?? "Perlu konsultasi lebih lanjut",
        confidence_score: topResult?.confidence ?? 0,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Gagal menyimpan hasil:", err);
    } finally {
      setSaving(false);
      setChecking(false);
    }
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setSeverity("");
    setDuration("");
    setResults(null);
    setNoMatchMessage(null);
  };

  const groupedSymptoms = symptoms.reduce((acc, s) => {
    const cat = s.category || "lainnya";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {} as Record<string, Symptom[]>);

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 70) return { label: "Kemungkinan Tinggi", variant: "destructive" as const };
    if (confidence >= 40) return { label: "Kemungkinan Sedang", variant: "default" as const };
    return { label: "Kemungkinan Rendah", variant: "secondary" as const };
  };

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

        {/* Loading */}
        {loadingData && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-sehat-500" />
            <p className="text-muted-foreground">Memuat data gejala dari database...</p>
          </div>
        )}

        {/* Error */}
        {dataError && !loadingData && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{dataError}</AlertDescription>
          </Alert>
        )}

        {/* Main */}
        {!loadingData && !dataError && (
          <>
            {results === null ? (
              <div className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Alat ini hanya memberikan informasi awal dan bukan pengganti konsultasi dokter.
                    Jika kondisi darurat, segera hubungi 119 atau pergi ke UGD terdekat.
                  </AlertDescription>
                </Alert>

                {/* Symptom list */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      1. Pilih Gejala
                      {selectedSymptoms.length > 0 && (
                        <Badge variant="secondary">{selectedSymptoms.length} dipilih</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {symptoms.length === 0 ? (
                      <div className="flex items-center gap-2 text-muted-foreground py-4">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">Belum ada data gejala di database.</span>
                      </div>
                    ) : (
                      Object.entries(groupedSymptoms).map(([category, items]) => (
                        <div key={category}>
                          <h3 className="font-medium text-sm text-muted-foreground mb-3 capitalize">
                            {category}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {items.map((symptom) => {
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
                                  <Checkbox checked={isSelected} readOnly />
                                  <span className="text-sm">{symptom.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
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
                  {checking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      Periksa Gejala
                      <Stethoscope className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              // ── Hasil ──────────────────────────────────────────────────────
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sehat-500" />
                      Hasil Analisis
                      {saving && (
                        <span className="text-xs text-muted-foreground font-normal flex items-center gap-1 ml-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Menyimpan...
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* No match */}
                    {noMatchMessage && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>{noMatchMessage}</AlertDescription>
                      </Alert>
                    )}

                    {/* Results list */}
                    {results && results.length > 0 && (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Berdasarkan {selectedSymptoms.length} gejala yang dipilih, berikut kemungkinan kondisi:
                        </p>
                        <div className="space-y-4">
                          {results.map((r, idx) => {
                            const badge = getConfidenceBadge(r.confidence);
                            return (
                              <div
                                key={r.disease.id}
                                className={`p-4 rounded-lg border ${
                                  idx === 0
                                    ? "bg-sehat-50/50 dark:bg-sehat-900/10 border-sehat-200 dark:border-sehat-800"
                                    : "bg-muted/30"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {idx === 0 && (
                                      <span className="text-xs bg-sehat-500 text-white px-2 py-0.5 rounded-full">
                                        Paling Cocok
                                      </span>
                                    )}
                                    <h3 className="font-semibold">{r.disease.name}</h3>
                                  </div>
                                  <Badge variant={badge.variant}>{badge.label}</Badge>
                                </div>

                                {/* Confidence bar */}
                                <div className="mb-3">
                                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>
                                      {r.matchedCount} dari {r.totalSymptoms} gejala cocok
                                    </span>
                                    <span>{r.confidence}% sesuai</span>
                                  </div>
                                  <Progress value={r.confidence} className="h-2" />
                                </div>

                                {r.disease.description && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {r.disease.description}
                                  </p>
                                )}
                                {r.disease.recommendation && (
                                  <div className="mt-2 p-3 rounded-md bg-background border text-sm">
                                    <span className="font-medium">Saran: </span>
                                    {r.disease.recommendation}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

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
          </>
        )}
      </main>
    </div>
  );
}
