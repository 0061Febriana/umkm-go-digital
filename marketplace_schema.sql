-- SQL for marketplace_price_cache table

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

-- Enable RLS
ALTER TABLE public.marketplace_price_cache ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public marketplace data are viewable by everyone." 
ON public.marketplace_price_cache FOR SELECT USING (true);

-- Insert dummy data
INSERT INTO public.marketplace_price_cache (nama_produk, kategori, subkategori, marketplace, harga, fee_marketplace, link_produk, rating_produk, jumlah_terjual)
VALUES 
('Blouse Wanita Korea', 'Fashion', 'Blouse', 'Shopee', 89000, 4.5, 'https://shopee.co.id/product/111222/333444', 4.8, 1200),
('Blouse Wanita Korea Style', 'Fashion', 'Blouse', 'TikTok Shop', 85000, 3.0, 'https://www.tiktok.com/view/product/1234567890', 4.7, 850),
('Keripik Pisang Coklat', 'Makanan', 'Keripik', 'Shopee', 25000, 4.0, 'https://shopee.co.id/product/555666/777888', 4.9, 5400),
('Keripik Pisang Lumer', 'Makanan', 'Keripik', 'TikTok Shop', 23000, 3.0, 'https://www.tiktok.com/view/product/9876543210', 4.8, 3200);
