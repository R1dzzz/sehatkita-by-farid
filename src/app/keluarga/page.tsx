"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  User,
  UserCircle,
  Shield,
} from "lucide-react";
import { calculateAge, calculateBMI, getBmiCategory } from "@/lib/utils";

interface FamilyMemberData {
  id: string;
  name: string;
  relationship: string;
  birth_date: string;
  gender: "male" | "female";
  blood_type: string | null;
  height: number | null;
  weight: number | null;
  allergies: string | null;
  medical_notes: string | null;
}

const initialMembers: FamilyMemberData[] = [
  {
    id: "1",
    name: "Budi Hartono",
    relationship: "Ayah",
    birth_date: "1985-03-15",
    gender: "male",
    blood_type: "O",
    height: 175,
    weight: 70,
    allergies: "None",
    medical_notes: "Tidak ada riwayat penyakit serius",
  },
  {
    id: "2",
    name: "Sari Dewi",
    relationship: "Ibu",
    birth_date: "1988-07-20",
    gender: "female",
    blood_type: "A",
    height: 160,
    weight: 55,
    allergies: "Debu",
    medical_notes: "Alergi ringan",
  },
  {
    id: "3",
    name: "Andi Hartono",
    relationship: "Anak",
    birth_date: "2015-01-10",
    gender: "male",
    blood_type: "O",
    height: 120,
    weight: 25,
    allergies: "None",
    medical_notes: "Imunisasi lengkap",
  },
  {
    id: "4",
    name: "Rina Hartono",
    relationship: "Anak",
    birth_date: "2018-05-25",
    gender: "female",
    blood_type: "A",
    height: 95,
    weight: 15,
    allergies: "Seafood",
    medical_notes: "Perlu imunisasi DPT",
  },
];

export default function KeluargaPage() {
  const [members, setMembers] = useState<FamilyMemberData[]>(initialMembers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMemberData | null>(null);

  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setRelationship("");
    setBirthDate("");
    setGender("male");
    setBloodType("");
    setHeight("");
    setWeight("");
    setAllergies("");
    setNotes("");
    setEditingMember(null);
  };

  const handleEdit = (member: FamilyMemberData) => {
    setEditingMember(member);
    setName(member.name);
    setRelationship(member.relationship);
    setBirthDate(member.birth_date);
    setGender(member.gender);
    setBloodType(member.blood_type || "");
    setHeight(member.height?.toString() || "");
    setWeight(member.weight?.toString() || "");
    setAllergies(member.allergies || "");
    setNotes(member.medical_notes || "");
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleSubmit = () => {
    if (!name || !relationship) return;

    const memberData: FamilyMemberData = {
      id: editingMember?.id || Date.now().toString(),
      name,
      relationship,
      birth_date: birthDate,
      gender,
      blood_type: bloodType || null,
      height: height ? parseFloat(height) : null,
      weight: weight ? parseFloat(weight) : null,
      allergies: allergies || null,
      medical_notes: notes || null,
    };

    if (editingMember) {
      setMembers(members.map((m) => (m.id === editingMember.id ? memberData : m)));
    } else {
      setMembers([...members, memberData]);
    }

    resetForm();
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sehat-50/30 to-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sehat-100 dark:bg-sehat-900/20">
                <Users className="w-6 h-6 text-sehat-600" />
              </div>
              Profil Keluarga
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola data kesehatan anggota keluarga Anda
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setDialogOpen(open); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sehat-500 to-kitablue-500 gap-2">
                <Plus className="w-4 h-4" />
                Tambah Anggota
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit" : "Tambah"} Anggota Keluarga</DialogTitle>
                <DialogDescription>
                  Isi data kesehatan anggota keluarga
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" />
                </div>
                <div className="space-y-2">
                  <Label>Hubungan</Label>
                  <Input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Ayah, Ibu, Anak, dll" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <RadioGroup value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="m" />
                      <Label htmlFor="m">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="f" />
                      <Label htmlFor="f">Perempuan</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Golongan Darah</Label>
                  <RadioGroup value={bloodType} onValueChange={setBloodType} className="flex flex-wrap gap-4">
                    {["A", "B", "AB", "O"].map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <RadioGroupItem value={t} id={`bt-${t}`} />
                        <Label htmlFor={`bt-${t}`}>{t}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tinggi (cm)</Label>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" />
                  </div>
                  <div className="space-y-2">
                    <Label>Berat (kg)</Label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="65" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Alergi</Label>
                  <Input value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Alergi (jika ada)" />
                </div>
                <div className="space-y-2">
                  <Label>Catatan Medis</Label>
                  <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan medis" />
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-sehat-500 to-kitablue-500" disabled={!name || !relationship}>
                  {editingMember ? "Simpan Perubahan" : "Tambah Anggota"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {members.map((member) => {
            const age = member.birth_date ? calculateAge(member.birth_date) : null;
            const bmi = member.height && member.weight ? calculateBMI(member.weight, member.height) : null;
            const bmiCat = bmi ? getBmiCategory(bmi) : null;

            return (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        member.gender === "male"
                          ? "bg-kitablue-100 text-kitablue-700"
                          : "bg-pink-100 text-pink-700"
                      }`}>
                        {member.gender === "male" ? (
                          <User className="w-7 h-7" />
                        ) : (
                          <UserCircle className="w-7 h-7" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.relationship} {age !== null && `(${age} tahun)`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Gol. Darah</p>
                      <p className="font-semibold text-lg">{member.blood_type || "-"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Tinggi</p>
                      <p className="font-semibold">{member.height ? `${member.height} cm` : "-"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Berat</p>
                      <p className="font-semibold">{member.weight ? `${member.weight} kg` : "-"}</p>
                    </div>
                  </div>

                  {bmi && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">BMI</span>
                        <span className={`font-semibold ${bmiCat?.color}`}>
                          {bmi} ({bmiCat?.label})
                        </span>
                      </div>
                    </div>
                  )}

                  {member.allergies && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">
                      <Shield className="w-4 h-4" />
                      Alergi: {member.allergies}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
