export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  subscription: "free" | "premium" | "family";
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  birth_date: string;
  gender: "male" | "female";
  blood_type: string | null;
  height: number | null;
  weight: number | null;
  allergies: string | null;
  medical_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface HealthRecord {
  id: string;
  user_id: string;
  family_member_id: string | null;
  record_type: "checkup" | "medication" | "symptom" | "vital" | "other";
  title: string;
  description: string | null;
  value: number | null;
  unit: string | null;
  recorded_at: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  family_member_id: string | null;
  title: string;
  description: string | null;
  reminder_type: "medication" | "immunization" | "appointment" | "other";
  scheduled_date: string;
  recurring: boolean;
  recurring_interval: string | null;
  completed: boolean;
  created_at: string;
}

export interface SymptomCheck {
  id: string;
  user_id: string;
  family_member_id: string | null;
  symptoms: string[];
  severity: "mild" | "moderate" | "severe";
  result: string | null;
  recommendation: string | null;
  created_at: string;
}

export interface RiskAssessment {
  id: string;
  user_id: string;
  family_member_id: string | null;
  assessment_type: string;
  score: number;
  risk_level: "low" | "moderate" | "high";
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface HealthFacility {
  id: string;
  name: string;
  type: "hospital" | "clinic" | "pharmacy" | "puskesmas";
  address: string;
  phone: string | null;
  latitude: number;
  longitude: number;
  operating_hours: string | null;
  services: string[] | null;
  is_24h: boolean;
  rating: number | null;
}

export interface EducationArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string | null;
  read_time: number | null;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  absen: number;
  photo_url: string;
  bio: string | null;
}
