"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Heart, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // Form state
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyRelation, setFamilyRelation] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }: { data: { user: any } }) => {
      if (u) {
        setUser(u);
        setFullName(u.user_metadata?.full_name || "");
      }
    });
  }, []);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Update user profile
      await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      });

      // Add first family member (self)
      await supabase.from("family_members").insert({
        user_id: user.id,
        name: fullName,
        relationship: "Diri Sendiri",
        birth_date: birthDate,
        gender: gender as "male" | "female",
        blood_type: bloodType,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
      });

      // Add family member if provided
      if (familyName) {
        await supabase.from("family_members").insert({
          user_id: user.id,
          name: familyName,
          relationship: familyRelation || "Anggota Keluarga",
        });
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-sehat-400 to-kitablue-400 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold">Selamat Datang di SehatKita!</h2>
              <p className="text-muted-foreground text-sm">
                Mari kami bantu mengatur profil kesehatan Anda. Hanya butuh beberapa langkah.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama lengkap Anda"
              />
            </div>
            <Button onClick={() => setStep(2)} className="w-full gap-2" disabled={!fullName}>
              Lanjutkan
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Data Pribadi</h2>
            <p className="text-sm text-muted-foreground">Informasi dasar untuk profil kesehatan Anda.</p>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate">Tanggal Lahir</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Jenis Kelamin</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType">Golongan Darah</Label>
              <RadioGroup value={bloodType} onValueChange={setBloodType} className="flex flex-wrap gap-4">
                {["A", "B", "AB", "O"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`blood-${type}`} />
                    <Label htmlFor={`blood-${type}`}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1 gap-2">
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Data Fisik</h2>
            <p className="text-sm text-muted-foreground">Untuk menghitung BMI dan memantau kesehatan.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Tinggi (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Berat (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="65"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button onClick={() => setStep(4)} className="flex-1 gap-2">
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Anggota Keluarga</h2>
            <p className="text-sm text-muted-foreground">
              Tambahkan anggota keluarga pertama Anda (opsional).
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="familyName">Nama Anggota Keluarga</Label>
              <Input
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Nama anggota keluarga"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyRelation">Hubungan</Label>
              <Input
                id="familyRelation"
                value={familyRelation}
                onChange={(e) => setFamilyRelation(e.target.value)}
                placeholder="Anak, Pasangan, Orang Tua, dll"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button 
                onClick={handleComplete} 
                className="flex-1 gap-2 bg-gradient-to-r from-sehat-500 to-kitablue-500"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Selesai"}
                <CheckCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sehat-50/50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sehat-500 to-kitablue-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="bg-gradient-to-r from-sehat-600 to-kitablue-600 bg-clip-text text-transparent">
              SehatKita
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-center">Langkah {step} dari {totalSteps}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
