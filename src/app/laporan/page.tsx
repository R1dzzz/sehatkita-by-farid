"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  Heart,
  Weight,
  Thermometer,
  Calendar,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weightData = [
  { month: "Jan", ayah: 72, ibu: 57, anak1: 24, anak2: 14 },
  { month: "Feb", ayah: 71.5, ibu: 56.5, anak1: 24.5, anak2: 14.5 },
  { month: "Mar", ayah: 71, ibu: 56, anak1: 25, anak2: 15 },
  { month: "Apr", ayah: 70.5, ibu: 55.5, anak1: 25.5, anak2: 15.2 },
  { month: "Mei", ayah: 70, ibu: 55, anak1: 26, anak2: 15.5 },
  { month: "Jun", ayah: 69.8, ibu: 54.8, anak1: 26.5, anak2: 15.8 },
];

const bmiData = [
  { name: "Ayah", bmi: 23.5, status: "Normal" },
  { name: "Ibu", bmi: 21.5, status: "Normal" },
  { name: "Anak 1", bmi: 17.4, status: "Normal (Anak)" },
  { name: "Anak 2", bmi: 16.6, status: "Normal (Anak)" },
];

const healthActivities = [
  { month: "Jan", checkup: 2, medication: 8, symptom: 1 },
  { month: "Feb", checkup: 1, medication: 10, symptom: 2 },
  { month: "Mar", checkup: 2, medication: 7, symptom: 0 },
  { month: "Apr", checkup: 1, medication: 9, symptom: 1 },
  { month: "Mei", checkup: 2, medication: 8, symptom: 2 },
  { month: "Jun", checkup: 1, medication: 6, symptom: 0 },
];

const immunizationData = [
  { name: "Selesai", value: 12, color: "#10b981" },
  { name: "Mendatang", value: 3, color: "#3b82f6" },
  { name: "Terlambat", value: 1, color: "#ef4444" },
];

const COLORS = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b"];

export default function LaporanPage() {
  const [selectedMember, setSelectedMember] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-900/20">
                <Activity className="w-6 h-6 text-pink-600" />
              </div>
              Laporan Bulanan
            </h1>
            <p className="text-muted-foreground mt-1">
              Ringkasan kesehatan keluarga per bulan
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Total Checkup", value: "9", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
            { title: "Rata-rata BMI", value: "19.8", icon: Weight, color: "text-green-600", bg: "bg-green-100" },
            { title: "Imunisasi", value: "12/16", icon: Heart, color: "text-sehat-600", bg: "bg-sehat-100" },
            { title: "Bulan Terpantau", value: "6", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
          ].map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className={`p-3 rounded-xl ${stat.bg} w-fit`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold mt-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="weight">
          <TabsList className="mb-6">
            <TabsTrigger value="weight" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Tren Berat
            </TabsTrigger>
            <TabsTrigger value="bmi" className="gap-2">
              <Weight className="w-4 h-4" />
              BMI
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="w-4 h-4" />
              Aktivitas
            </TabsTrigger>
            <TabsTrigger value="immunization" className="gap-2">
              <Heart className="w-4 h-4" />
              Imunisasi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <CardTitle>Tren Berat Badan (6 Bulan)</CardTitle>
                <CardDescription>Perkembangan berat badan anggota keluarga</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={weightData}>
                    <defs>
                      <linearGradient id="colorAyah" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorIbu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="ayah" stroke="#3b82f6" fill="url(#colorAyah)" name="Ayah" />
                    <Area type="monotone" dataKey="ibu" stroke="#ec4899" fill="url(#colorIbu)" name="Ibu" />
                    <Area type="monotone" dataKey="anak1" stroke="#10b981" fillOpacity={0} name="Anak 1" />
                    <Area type="monotone" dataKey="anak2" stroke="#f59e0b" fillOpacity={0} name="Anak 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bmi">
            <Card>
              <CardHeader>
                <CardTitle>BMI per Anggota Keluarga</CardTitle>
                <CardDescription>Indeks Massa Tubuh saat ini</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={bmiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 30]} />
                    <Tooltip />
                    <Bar dataKey="bmi" fill="#10b981" radius={[8, 8, 0, 0]} name="BMI" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bmiData.map((d) => (
                    <div key={d.name} className="text-center p-3 bg-muted rounded-lg">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-2xl font-bold text-sehat-600">{d.bmi}</p>
                      <Badge variant="secondary" className="text-xs">{d.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Kesehatan</CardTitle>
                <CardDescription>Jumlah aktivitas per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={healthActivities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="checkup" stackId="a" fill="#3b82f6" name="Checkup" />
                    <Bar dataKey="medication" stackId="a" fill="#10b981" name="Minum Obat" />
                    <Bar dataKey="symptom" stackId="a" fill="#ef4444" name="Gejala" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="immunization">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status Imunisasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={immunizationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {immunizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {immunizationData.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-sm">{d.name}: {d.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Imunisasi Mendatang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "DPT Booster (Anak)", date: "15 Mei 2025", status: "Mendatang" },
                    { name: "MMR (Anak 2)", date: "1 Juni 2025", status: "Mendatang" },
                    { name: "Campak (Anak)", date: "15 April 2025", status: "Terlambat" },
                    { name: "Polio (Anak 2)", date: "10 Maret 2025", status: "Selesai" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge
                        variant={
                          item.status === "Selesai"
                            ? "default"
                            : item.status === "Terlambat"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
