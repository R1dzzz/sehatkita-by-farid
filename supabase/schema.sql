-- =====================================================
-- SehatKita Database Schema
-- Platform Kesehatan Keluarga
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE
-- Custom user profiles extending Supabase Auth
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  subscription TEXT DEFAULT 'free' CHECK (subscription IN ('free', 'premium', 'family')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. FAMILY MEMBERS TABLE
-- Store family member health profiles
-- =====================================================
CREATE TABLE IF NOT EXISTS family_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  blood_type TEXT CHECK (blood_type IN ('A', 'B', 'AB', 'O')),
  height NUMERIC, -- in cm
  weight NUMERIC, -- in kg
  allergies TEXT,
  medical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. HEALTH RECORDS TABLE
-- Store health checkup records, vitals, etc.
-- =====================================================
CREATE TABLE IF NOT EXISTS health_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  record_type TEXT NOT NULL CHECK (record_type IN ('checkup', 'medication', 'symptom', 'vital', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  value NUMERIC,
  unit TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. REMINDERS TABLE
-- Store medication, immunization, and appointment reminders
-- =====================================================
CREATE TABLE IF NOT EXISTS reminders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('medication', 'immunization', 'appointment', 'other')),
  scheduled_date TIMESTAMPTZ NOT NULL,
  recurring BOOLEAN DEFAULT FALSE,
  recurring_interval TEXT, -- daily, weekly, monthly
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. SYMPTOM CHECKS TABLE
-- Store symptom check history
-- =====================================================
CREATE TABLE IF NOT EXISTS symptom_checks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  symptoms TEXT[] NOT NULL,
  severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')),
  result TEXT,
  recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. RISK ASSESSMENTS TABLE
-- Store risk assessment results
-- =====================================================
CREATE TABLE IF NOT EXISTS risk_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  assessment_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high')),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. HEALTH FACILITIES TABLE
-- Store health facility data (hospitals, clinics, pharmacies)
-- =====================================================
CREATE TABLE IF NOT EXISTS health_facilities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hospital', 'clinic', 'pharmacy', 'puskesmas')),
  address TEXT NOT NULL,
  phone TEXT,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  operating_hours TEXT,
  services TEXT[],
  is_24h BOOLEAN DEFAULT FALSE,
  rating NUMERIC CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. EDUCATION ARTICLES TABLE
-- Store health education content
-- =====================================================
CREATE TABLE IF NOT EXISTS education_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  read_time INTEGER, -- in minutes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. TEAM MEMBERS TABLE (for About Us page)
-- =====================================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  absen INTEGER NOT NULL,
  photo_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- USERS: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Insert policy handled by trigger or admin
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- FAMILY MEMBERS: Users can CRUD their own family members
CREATE POLICY "Users can view own family members" ON family_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create family members" ON family_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own family members" ON family_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own family members" ON family_members
  FOR DELETE USING (auth.uid() = user_id);

-- HEALTH RECORDS: Users can CRUD their own records
CREATE POLICY "Users can view own health records" ON health_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create health records" ON health_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health records" ON health_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health records" ON health_records
  FOR DELETE USING (auth.uid() = user_id);

-- REMINDERS: Users can CRUD their own reminders
CREATE POLICY "Users can view own reminders" ON reminders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create reminders" ON reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reminders" ON reminders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders" ON reminders
  FOR DELETE USING (auth.uid() = user_id);

-- SYMPTOM CHECKS: Users can view/create their own
CREATE POLICY "Users can view own symptom checks" ON symptom_checks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create symptom checks" ON symptom_checks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RISK ASSESSMENTS: Users can view/create their own
CREATE POLICY "Users can view own risk assessments" ON risk_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create risk assessments" ON risk_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- HEALTH FACILITIES: Public read access
CREATE POLICY "Anyone can view health facilities" ON health_facilities
  FOR SELECT USING (true);

-- EDUCATION ARTICLES: Public read access
CREATE POLICY "Anyone can view education articles" ON education_articles
  FOR SELECT USING (true);

-- TEAM MEMBERS: Public read access
CREATE POLICY "Anyone can view team members" ON team_members
  FOR SELECT USING (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply auto-update trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Sample health facilities
INSERT INTO health_facilities (name, type, address, phone, latitude, longitude, operating_hours, services, is_24h, rating) VALUES
  ('RSUD Dr. Soetomo', 'hospital', 'Jl. Mayjen Prof. Dr. Moestopo 6-8, Surabaya', '(031) 5501001', -7.2685, 112.758, '24 Jam', ARRAY['IGD', 'Rawat Inap', 'Spesialis', 'Laboratorium', 'Radiologi'], true, 4.5),
  ('Puskesmas Wonokromo', 'puskesmas', 'Jl. Wonokromo, Surabaya', '(031) 5678901', -7.3023, 112.7348, '08:00 - 16:00', ARRAY['Pemeriksaan Umum', 'Imunisasi', 'KIA', 'Laboratorium Dasar'], false, 4.0),
  ('Apotek K24', 'pharmacy', 'Jl. Dharmahusada Indah Utara 45, Surabaya', '(031) 5917524', -7.276, 112.77, '24 Jam', ARRAY['Obat Bebas', 'Obat Resep', 'Konsultasi Farmasi'], true, 4.3)
ON CONFLICT DO NOTHING;

-- Sample education articles
INSERT INTO education_articles (title, content, category, author, read_time) VALUES
  ('Panduan Imunisasi Lengkap', 'Konten artikel imunisasi...', 'anak', 'Dr. Sari Wulandari, Sp.A', 8),
  ('Cegah Penyakit Jantung', 'Konten artikel jantung...', 'dewasa', 'Dr. Budi Santoso, Sp.JP', 6)
ON CONFLICT DO NOTHING;

-- Sample team members
INSERT INTO team_members (name, role, absen, bio) VALUES
  ('Farid Alfiyansah', 'Project Manager & Frontend Developer', 26, 'Mengoordinasikan tim dan mengembangkan antarmuka pengguna.'),
  ('Halim', 'Backend Developer', 31, 'Bertanggung jawab atas arsitektur backend dan integrasi Supabase.'),
  ('Fauzan Yusuf', 'UI/UX Designer', 27, 'Mendesain pengalaman pengguna yang ramah untuk semua usia.'),
  ('Devino Bintang', 'Full Stack Developer', 5, 'Mengembangkan fitur-fitur utama aplikasi.'),
  ('Denis Alfarizi', 'QA & Testing', 4, 'Memastikan kualitas aplikasi melalui pengujian menyeluruh.'),
  ('Eka Ardiansah', 'Content & Documentation', 19, 'Menyusun konten edukasi kesehatan dan dokumentasi teknis.')
ON CONFLICT DO NOTHING;

-- =====================================================
-- STORAGE BUCKET SETUP (for avatars and images)
-- =====================================================

-- Create storage bucket for avatars (run in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('health-images', 'health-images', true);

-- Storage RLS policies
-- CREATE POLICY "Avatar public access" ON storage.objects
--   FOR SELECT USING (bucket_id = 'avatars');

-- CREATE POLICY "Users can upload own avatar" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);
