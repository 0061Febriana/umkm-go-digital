-- SQL Schema & Dummy Data for UMKM Go Digital (Updated)
-- Run this in your Supabase SQL Editor to ensure all tables match the frontend code.

-- ==========================================
-- 1. Table: categories
-- ==========================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);

-- ==========================================
-- 2. Table: articles (Updated with category_id, slug, status, excerpt)
-- ==========================================
-- Drop existing foreign key constraints if they exist to prevent type mismatches during rebuilds
ALTER TABLE IF EXISTS public.articles DROP CONSTRAINT IF EXISTS articles_category_id_fkey;

CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- In case the table already existed but missing columns, add them safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'slug') THEN
        ALTER TABLE public.articles ADD COLUMN slug TEXT UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'category_id') THEN
        ALTER TABLE public.articles ADD COLUMN category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'excerpt') THEN
        ALTER TABLE public.articles ADD COLUMN excerpt TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'status') THEN
        ALTER TABLE public.articles ADD COLUMN status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'published';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'updated_at') THEN
        ALTER TABLE public.articles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
    END IF;
END $$;

-- ==========================================
-- 3. Table: marketplace_price_cache
-- ==========================================
CREATE TABLE IF NOT EXISTS public.marketplace_price_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_produk TEXT NOT NULL,
    kategori TEXT NOT NULL,
    subkategori TEXT NOT NULL,
    marketplace TEXT NOT NULL CHECK (marketplace IN ('Shopee', 'TikTok Shop')),
    harga NUMERIC NOT NULL,
    fee_marketplace NUMERIC DEFAULT 0,
    link_produk TEXT NOT NULL,
    rating_produk NUMERIC,
    jumlah_terjual INTEGER,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Table: admins
-- ==========================================
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 5. ENABLE RLS & POLICIES (Allow all for Anon since app doesn't use Supabase Auth)
-- ==========================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_price_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Drop policies to avoid conflict if they exist
DROP POLICY IF EXISTS "Allow all actions for categories" ON public.categories;
DROP POLICY IF EXISTS "Allow all actions for articles" ON public.articles;
DROP POLICY IF EXISTS "Allow all actions for marketplace_price_cache" ON public.marketplace_price_cache;
DROP POLICY IF EXISTS "Allow all actions for admins" ON public.admins;
DROP POLICY IF EXISTS "Public articles are viewable by everyone." ON public.articles;
DROP POLICY IF EXISTS "Public marketplace data are viewable by everyone." ON public.marketplace_price_cache;

-- Recreate policies
CREATE POLICY "Allow all actions for categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all actions for articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all actions for marketplace_price_cache" ON public.marketplace_price_cache FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all actions for admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- ==========================================
-- 6. INSERT DUMMY DATA: ADMIN
-- ==========================================
INSERT INTO public.admins (username, password)
VALUES ('admin', 'umkm2025')
ON CONFLICT (username) DO NOTHING;

-- ==========================================
-- 7. INSERT DUMMY DATA: CATEGORIES
-- ==========================================
INSERT INTO public.categories (name, slug) VALUES 
('Strategi Pemasaran', 'strategi'),
('Kebijakan Marketplace', 'kebijakan'),
('Tips Toko Online', 'tips')
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 8. INSERT DUMMY DATA: ARTICLES
-- ==========================================
-- Menggunakan subquery untuk mengambil category_id secara dinamis agar tidak error Foreign Key
INSERT INTO public.articles (title, slug, category_id, content, status) VALUES 
(
  'Social Media Marketing', 
  'social-media-marketing', 
  (SELECT id FROM public.categories WHERE slug = 'strategi' LIMIT 1), 
  'Manfaatkan Instagram, TikTok, dan Facebook untuk menjangkau lebih banyak calon pembeli. Buat konten yang menarik dan konsisten.', 
  'published'
),
(
  'SEO Marketplace', 
  'seo-marketplace', 
  (SELECT id FROM public.categories WHERE slug = 'strategi' LIMIT 1), 
  'Optimalkan judul, deskripsi, dan foto produk agar muncul di halaman pertama pencarian marketplace.', 
  'published'
),
(
  'Kebijakan Gratis Ongkir', 
  'kebijakan-gratis-ongkir', 
  (SELECT id FROM public.categories WHERE slug = 'kebijakan' LIMIT 1), 
  'Shopee memperbarui syarat program Gratis Ongkir. Penjual wajib mempertahankan rating minimal 4.5.', 
  'published'
),
(
  'Foto Produk Berkualitas', 
  'foto-produk-berkualitas', 
  (SELECT id FROM public.categories WHERE slug = 'tips' LIMIT 1), 
  'Gunakan pencahayaan alami dan minimaliskan background. Foto adalah hal pertama yang dilihat pembeli.', 
  'published'
)
ON CONFLICT (slug) DO NOTHING;
