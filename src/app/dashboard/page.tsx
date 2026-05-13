"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Pill,
  Heart,
  TrendingUp,
  Activity,
  Calendar,
  ArrowRight,
  Shield,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample chart data
const healthTrendData = [
  { month: "Jan", score: 75 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 82 },
  { month: "Apr", score: 80 },
  { month: "Mei", score: 85 },
  { month: "Jun", score: 88 },
];

const upcomingReminders = [
  { id: 1, title: "Imunisasi DPT Anak", date: "15 Mei 2025", type: "immunization" },
  { id: 2, title: "Minum Vitamin C", date: "Setiap hari", type: "medication" },
  { id: 3, title: "Checkup Bulanan", date: "20 Mei 2025", type: "appointment" },
];

const quickStats = [
  {
    title: "Anggota Keluarga",
    value: "4",
    icon: Users,
    color: "text-sehat-600",
    bg: "bg-sehat-100 dark:bg-sehat-900/20",
    link: "/keluarga",
  },
  {
    title: "Pengingat Aktif",
    value: "3",
    icon: Pill,
    color: "text-kitablue-600",
    bg: "bg-kitablue-100 dark:bg-kitablue-900/20",
    link: "/reminder",
  },
  {
    title: "Skor Kesehatan",
    value: "88",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/20",
    link: "/risiko",
  },
  {
    title: "Checkup Bulan Ini",
    value: "2",
    icon: Activity,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    link: "/laporan",
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sehat-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Selamat Datang, {user.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-muted-foreground">
            Berikut ringkasan kesehatan keluarga Anda hari ini.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => (
            <Link href={stat.link} key={stat.title}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Health Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sehat-500" />
                Tren Kesehatan
              </CardTitle>
              <CardDescription>
                Skor kesehatan keluarga 6 bulan terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={healthTrendData}>
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#healthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-kitablue-500" />
                Pengingat Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className={`p-2 rounded-lg ${
                    reminder.type === "immunization"
                      ? "bg-yellow-100 text-yellow-700"
                      : reminder.type === "medication"
                      ? "bg-kitablue-100 text-kitablue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    <Pill className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{reminder.title}</p>
                    <p className="text-xs text-muted-foreground">{reminder.date}</p>
                  </div>
                </div>
              ))}
              <Link href="/reminder">
                <Button variant="ghost" className="w-full text-sm gap-2">
                  Lihat Semua
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Cek Gejala", icon: Stethoscope, link: "/gejala", color: "from-purple-500 to-pink-500" },
              { title: "Risk Assessment", icon: Shield, link: "/risiko", color: "from-orange-500 to-red-500" },
              { title: "Cari Faskes", icon: Activity, link: "/peta", color: "from-sehat-500 to-teal-500" },
              { title: "Edukasi", icon: TrendingUp, link: "/edukasi", color: "from-kitablue-500 to-indigo-500" },
            ].map((action) => (
              <Link href={action.link} key={action.title}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-sm">{action.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
