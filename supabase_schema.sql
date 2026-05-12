-- SQL Schema & Dummy Data for UMKM Go Digital (Supabase)

-- ==========================================
-- 1. Table: articles (Untuk konten edukasi)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Strategi', 'Kebijakan', 'Tips')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. Table: admins (Untuk kredensial admin)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. ENABLE RLS
-- ==========================================
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. POLICIES
-- ==========================================
-- Izinkan siapapun melihat artikel
CREATE POLICY "Public articles are viewable by everyone." 
ON public.articles FOR SELECT USING (true);


-- ==========================================
-- 5. INSERT DATA: ADMIN
-- ==========================================
INSERT INTO public.admins (username, password)
VALUES ('admin', 'umkm2025')
ON CONFLICT (username) DO NOTHING;

-- ==========================================
-- 6. INSERT DUMMY DATA: ARTICLES
-- ==========================================

-- A. STRATEGI
INSERT INTO public.articles (title, category, content) VALUES 
('Social Media Marketing', 'Strategi', 'Manfaatkan Instagram, TikTok, dan Facebook untuk menjangkau lebih banyak calon pembeli. Buat konten yang menarik dan konsisten.
Tips:
- Posting minimal 3x seminggu
- Gunakan hashtag relevan
- Balas komentar & DM cepat
- Manfaatkan fitur Story & Reels'),

('SEO Marketplace', 'Strategi', 'Optimalkan judul, deskripsi, dan foto produk agar muncul di halaman pertama pencarian marketplace.
Tips:
- Gunakan kata kunci yang sering dicari
- Upload foto berkualitas tinggi
- Isi semua atribut produk dengan lengkap'),

('Iklan Berbayar', 'Strategi', 'Gunakan fitur iklan dari Shopee Ads, Tokopedia TopAds, atau Meta Ads untuk memperluas jangkauan secara masif dan cepat.
Tips:
- Mulai dengan budget kecil untuk testing
- Targetkan audiens spesifik
- Evaluasi ROI mingguan');

-- B. KEBIJAKAN
INSERT INTO public.articles (title, category, content) VALUES 
('Kebijakan Gratis Ongkir Shopee', 'Kebijakan', 'Shopee memperbarui syarat program Gratis Ongkir. Penjual wajib mempertahankan rating minimal 4.5 dan memproses pesanan dengan cepat.
Perhatian:
- Performa toko minimal harus hijau
- Tingkat keterlambatan pengiriman kurang dari 5%'),

('Program Power Merchant Pro Tokopedia', 'Kebijakan', 'Power Merchant Pro kini memberikan lebih banyak prioritas pencarian organik. Sangat direkomendasikan untuk UMKM dengan stok siap jual.
Perusahaan dapat memberhentikan status jika merchant mendadak tidak aktif lebih dari 7 hari tanpa mode libur.'),

('Larangan Produk Replika & Pelanggaran Hak Cipta', 'Kebijakan', 'Semua marketplace secara kompak menggunakan AI pendeteksi teks dan gambar asli. Akun bisa ter-suspend tanpa peringatan manual jika ketahuan menduplikasi produk merk terkenal (KW).');

-- C. TIPS
INSERT INTO public.articles (title, category, content) VALUES 
('Foto Produk Berkualitas', 'Tips', 'Foto adalah hal pertama yang dilihat pembeli. Gunakan pencahayaan alami dan minimaliskan background.
Saran:
- Foto minimal 5 angle berbeda dari produk fisik
- Jangan gunakan watermark berlebihan yang menutupi produk'),

('Respons Cepat & Ramah', 'Tips', 'Pembeli online benci menunggu. Merespons di bawah 1 jam dapat meningkatkan konversi hingga 40%.
Saran:
- Gunakan auto-reply untuk FAQ
- Sapa dengan nama (Bapak/Ibu Budi)
- Jangan lupa emoji (🙏 😊)'),

('Manfaatkan Momen Super Sale', 'Tips', 'Ikuti event bulanan seperti Flash Sale, 11.11, atau Payday. Siapkan bundle produk.
Saran:
- Gabungkan barang terlaku dengan dead stock menjadi satu paket bundle harga hemat.');
