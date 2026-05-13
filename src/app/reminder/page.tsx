"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Syringe,
  Stethoscope,
  Bell,
} from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: "medication" | "immunization" | "appointment" | "other";
  date: string;
  time: string;
  recurring: boolean;
  completed: boolean;
  member: string;
}

const typeConfig = {
  medication: { icon: Pill, label: "Obat", color: "bg-kitablue-100 text-kitablue-700" },
  immunization: { icon: Syringe, label: "Imunisasi", color: "bg-yellow-100 text-yellow-700" },
  appointment: { icon: Stethoscope, label: "Janji Dokter", color: "bg-purple-100 text-purple-700" },
  other: { icon: Bell, label: "Lainnya", color: "bg-gray-100 text-gray-700" },
};

const initialReminders: Reminder[] = [
  {
    id: "1",
    title: "Vitamin C",
    description: "Minum vitamin C 500mg setelah makan",
    type: "medication",
    date: "2025-05-12",
    time: "08:00",
    recurring: true,
    completed: false,
    member: "Ayah",
  },
  {
    id: "2",
    title: "Imunisasi DPT Anak",
    description: "Imunisasi DPT booster untuk Andi",
    type: "immunization",
    date: "2025-05-15",
    time: "09:00",
    recurring: false,
    completed: false,
    member: "Andi",
  },
  {
    id: "3",
    title: "Checkup Bulanan Ibu",
    description: "Pemeriksaan rutin ke dokter kandungan",
    type: "appointment",
    date: "2025-05-20",
    time: "10:30",
    recurring: true,
    completed: false,
    member: "Ibu",
  },
  {
    id: "4",
    title: "Minum Obat Maag",
    description: "Obat maag sebelum makan siang",
    type: "medication",
    date: "2025-05-12",
    time: "12:00",
    recurring: true,
    completed: true,
    member: "Kakek",
  },
];

export default function ReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"medication" | "immunization" | "appointment" | "other">("medication");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [member, setMember] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("medication");
    setDate("");
    setTime("");
    setRecurring(false);
    setMember("");
  };

  const handleAdd = () => {
    if (!title || !date) return;
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      description,
      type,
      date,
      time,
      recurring,
      completed: false,
      member: member || "Umum",
    };
    setReminders([newReminder, ...reminders]);
    resetForm();
    setDialogOpen(false);
  };

  const toggleComplete = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const filteredReminders =
    filter === "all"
      ? reminders
      : filter === "completed"
      ? reminders.filter((r) => r.completed)
      : filter === "pending"
      ? reminders.filter((r) => !r.completed)
      : reminders.filter((r) => r.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-kitablue-100 dark:bg-kitablue-900/20">
                <Bell className="w-6 h-6 text-kitablue-600" />
              </div>
              Pengingat & Kalender
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola jadwal obat, imunisasi, dan janji dokter
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sehat-500 to-kitablue-500 gap-2">
                <Plus className="w-4 h-4" />
                Tambah
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Pengingat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nama obat/kegiatan" />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Keterangan" />
                </div>
                <div className="space-y-2">
                  <Label>Tipe</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(typeConfig).map(([key, config]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={type === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setType(key as Reminder["type"])}
                      >
                        <config.icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Waktu</Label>
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Untuk Anggota</Label>
                  <Input value={member} onChange={(e) => setMember(e.target.value)} placeholder="Nama anggota keluarga" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={recurring} onCheckedChange={(c) => setRecurring(c as boolean)} />
                  <Label>Berulang</Label>
                </div>
                <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-sehat-500 to-kitablue-500" disabled={!title || !date}>
                  Tambah Pengingat
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "all", label: "Semua" },
            { key: "pending", label: "Belum Selesai" },
            { key: "completed", label: "Selesai" },
            { key: "medication", label: "Obat" },
            { key: "immunization", label: "Imunisasi" },
            { key: "appointment", label: "Janji Dokter" },
          ].map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Reminders List */}
        <div className="space-y-3">
          {filteredReminders.map((reminder) => {
            const config = typeConfig[reminder.type];
            return (
              <Card
                key={reminder.id}
                className={`transition-all ${
                  reminder.completed ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <button
                    onClick={() => toggleComplete(reminder.id)}
                    className="flex-shrink-0"
                  >
                    {reminder.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-sehat-500" />
                    )}
                  </button>

                  <div className={`p-2 rounded-lg ${config.color} flex-shrink-0`}>
                    <config.icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium ${
                        reminder.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {reminder.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {reminder.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {reminder.date}
                      </Badge>
                      {reminder.time && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {reminder.time}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {reminder.member}
                      </Badge>
                      {reminder.recurring && (
                        <Badge variant="outline" className="text-xs text-sehat-600">
                          Berulang
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 flex-shrink-0"
                    onClick={() => handleDelete(reminder.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          {filteredReminders.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada pengingat</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
