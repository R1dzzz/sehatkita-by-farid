"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  Heart,
  Cigarette,
  Wine,
  Dumbbell,
  Apple,
  Brain,
  RefreshCw,
} from "lucide-react";
import { calculateBMI, getBmiCategory } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface Question {
  id: string;
  text: string;
  category: string;
  options: { value: number; label: string }[];
}

const questions: Question[] = [
  {
    id: "smoking",
    text: "Apakah Anda merokok?",
    category: "gaya_hidup",
    options: [
      { value: 0, label: "Tidak pernah" },
      { value: 2, label: "Pernah, sudah berhenti" },
      { value: 5, label: "Kadang-kadang" },
      { value: 10, label: "Setiap hari" },
    ],
  },
  {
    id: "alcohol",
    text: "Seberapa sering Anda mengonsumsi alkohol?",
    category: "gaya_hidup",
    options: [
      { value: 0, label: "Tidak pernah" },
      { value: 2, label: "Jarang (1x/bulan)" },
      { value: 5, label: "Sering (1x/minggu)" },
      { value: 10, label: "Sangat sering (setiap hari)" },
    ],
  },
  {
    id: "exercise",
    text: "Seberapa sering Anda berolahraga?",
    category: "aktivitas",
    options: [
      { value: 0, label: "Setiap hari (>30 menit)" },
      { value: 3, label: "3-4x seminggu" },
      { value: 7, label: "1-2x seminggu" },
      { value: 10, label: "Jarang / Tidak pernah" },
    ],
  },
  {
    id: "diet",
    text: "Seberapa sehat pola makan Anda?",
    category: "gaya_hidup",
    options: [
      { value: 0, label: "Sangat sehat (banyak sayur & buah)" },
      { value: 3, label: "Cukup sehat" },
      { value: 7, label: "Kurang sehat" },
      { value: 10, label: "Tidak sehat (banyak junk food)" },
    ],
  },
  {
    id: "sleep",
    text: "Berapa jam tidur Anda per malam?",
    category: "gaya_hidup",
    options: [
      { value: 0, label: "7-9 jam" },
      { value: 3, label: "6-7 jam" },
      { value: 7, label: "5-6 jam" },
      { value: 10, label: "<5 jam" },
    ],
  },
  {
    id: "stress",
    text: "Seberapa sering Anda merasa stres?",
    category: "mental",
    options: [
      { value: 0, label: "Jarang" },
      { value: 3, label: "Kadang-kadang" },
      { value: 7, label: "Sering" },
      { value: 10, label: "Hampir selalu" },
    ],
  },
  {
    id: "family_history",
    text: "Apakah ada riwayat penyakit serius di keluarga?",
    category: "genetik",
    options: [
      { value: 0, label: "Tidak ada" },
      { value: 3, label: "Satu jenis penyakit" },
      { value: 7, label: "Beberapa penyakit" },
      { value: 10, label: "Banyak riwayat penyakit" },
    ],
  },
  {
    id: "checkup",
    text: "Seberapa sering Anda medical checkup?",
    category: "pencegahan",
    options: [
      { value: 0, label: "Setiap tahun" },
      { value: 3, label: "2 tahun sekali" },
      { value: 7, label: "Hanya saat sakit" },
      { value: 10, label: "Jarang pernah" },
    ],
  },
];

export default function RisikoPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isComplete = Object.keys(answers).length === questions.length;

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let riskLevel: string;
    let color: string;
    let advice: string;

    if (percentage < 30) {
      riskLevel = "Rendah";
      color = "text-green-500";
      advice = "Risiko kesehatan Anda rendah. Pertahankan gaya hidup sehat dan lakukan medical checkup rutin setiap tahun.";
    } else if (percentage < 60) {
      riskLevel = "Sedang";
      color = "text-yellow-500";
      advice = "Risiko kesehatan Anda sedang. Disarankan untuk mulai meningkatkan gaya hidup sehat dan konsultasi dengan dokter.";
    } else {
      riskLevel = "Tinggi";
      color = "text-red-500";
      advice = "Risiko kesehatan Anda tinggi. Segera konsultasi dengan dokter untuk evaluasi lebih lanjut dan buat rencana perbaikan gaya hidup.";
    }

    // Radar chart data
    const categories: Record<string, number> = {};
    questions.forEach((q) => {
      if (!categories[q.category]) categories[q.category] = 0;
      categories[q.category] += answers[q.id];
    });

    const radarData = Object.entries(categories).map(([key, value]) => ({
      category: key.replace("_", " "),
      score: value,
      fullMark: 20,
    }));

    setResult({
      totalScore,
      maxScore,
      percentage,
      riskLevel,
      color,
      advice,
      radarData,
    });
  };

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/20">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            Risk Assessment
          </h1>
          <p className="text-muted-foreground mt-2">
            Evaluasi risiko kesehatan berdasarkan gaya hidup dan faktor risiko
          </p>
        </div>

        {!result ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pertanyaan {currentQ + 1} dari {questions.length}</CardTitle>
                  <CardDescription>Kategori: {questions[currentQ].category.replace("_", " ")}</CardDescription>
                </div>
                <Progress value={((currentQ + 1) / questions.length) * 100} className="w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h2 className="text-xl font-semibold">{questions[currentQ].text}</h2>
              
              <RadioGroup
                value={answers[questions[currentQ].id]?.toString() || ""}
                onValueChange={(v) => handleAnswer(questions[currentQ].id, parseInt(v))}
                className="space-y-3"
              >
                {questions[currentQ].options.map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                      answers[questions[currentQ].id] === opt.value
                        ? "border-sehat-500 bg-sehat-50 dark:bg-sehat-900/20"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <RadioGroupItem value={opt.value.toString()} id={opt.value.toString()} />
                    <Label htmlFor={opt.value.toString()} className="flex-1 cursor-pointer">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                  disabled={currentQ === 0}
                >
                  Sebelumnya
                </Button>
                {currentQ < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQ(currentQ + 1)}
                    disabled={answers[questions[currentQ].id] === undefined}
                  >
                    Selanjutnya
                  </Button>
                ) : (
                  <Button
                    onClick={calculateResult}
                    disabled={!isComplete}
                    className="bg-gradient-to-r from-orange-500 to-red-500"
                  >
                    Lihat Hasil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Hasil Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Circle */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-40 h-40">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={result.percentage < 30 ? "#22c55e" : result.percentage < 60 ? "#eab308" : "#ef4444"}
                        strokeWidth="12"
                        strokeDasharray={`${(result.percentage / 100) * 440} 440`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute">
                      <span className={`text-4xl font-bold ${result.color}`}>
                        {Math.round(result.percentage)}
                      </span>
                      <span className="text-sm text-muted-foreground block">/ 100</span>
                    </div>
                  </div>
                  <h2 className={`text-2xl font-bold mt-4 ${result.color}`}>
                    Risiko {result.riskLevel}
                  </h2>
                </div>

                {/* Radar Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={result.radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 20]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm">{result.advice}</p>
                </Alert>

                <Button onClick={reset} variant="outline" className="w-full gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Ulangi Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
