# Audit Keamanan Siber dan Keamanan Informasi
# UMKM Go Digital

Tanggal audit: 2026-11-09
Standar referensi: ISO/IEC 27000:2026
Penanggung jawab audit: AI Expert Development & Security Review

---

## 1. Ringkasan Eksekutif

Hasil audit keamanan pada sistem UMKM Go Digital menunjukkan bahwa aplikasi ini masih berada pada status belum siap untuk deployment produksi yang aman. Beberapa celah keamanan utama ditemukan di area autentikasi, kontrol akses, enkripsi data, validasi input, dan session management.

Secara umum, sistem memiliki karakteristik prototype atau demo yang belum diperhitungkan aspek keamanan informasi berdasarkan prinsip-prinsip ISO/IEC 27000:2026.

Temuan utama:
- Autentikasi admin menggunakan pencocokan password plaintext di sisi aplikasi/database
- Sesi login disimpan di localStorage, yang tidak aman untuk kontrol akses sensitif
- RLS Supabase dibuat terlalu longgar, sehingga semua operasi dapat dilakukan oleh pihak tak berwenang
- Data kredensial admin disimpan tanpa teknik hash yang aman
- Terdapat potensi stored XSS pada konten artikel yang ditampilkan dengan dangerouslySetInnerHTML
- Endpoint validasi link berpotensi rentan terhadap SSRF
- Tidak ditemukan konfigurasi keamanan yang cukup seperti HSTS, CSP, WAF, atau rate limiting yang jelas

Kesimpulan: sistem ini memerlukan perbaikan mendesak sebelum digunakan dalam lingkungan yang menangani data sensitif atau akses administratif.

---

## 2. Ruang Lingkup Audit

Audit ini mencakup:
- Kontrol akses dan autentikasi
- Enkripsi data dan penyimpanan password
- Keamanan jaringan dan firewall (aspek konfigurasi dan hardening)
- Validasi input dan keamanan aplikasi web
- Penetration testing berdasarkan skenario realistis
- Kesesuaian terhadap prinsip-prinsip dasar ISO/IEC 27000:2026

---

## 3. Metodologi Audit

Metodologi yang digunakan adalah review kode statis, pemeriksaan konfigurasi aplikasi, dan analisis arsitektur keamanan berdasarkan praktik terbaik industri. Audit ini menilai:
- logika autentikasi dan authorization
- penggunaan session storage / localStorage untuk akses sensitif
- pengelolaan secret dan credential
- kebijakan keamanan database
- risiko input sanitization
- kemungkinan SSRF dan XSS
- tingkat kesiapan terhadap keamanan siber berbasis ISO/IEC 27000

---

## 4. Temuan Utama

### 4.1 Autentikasi admin sangat lemah

Bukti implementasi:
- File: src/app/admin-login-umkm/page.tsx
- Login admin melakukan query ke tabel admins dengan `.eq("username", username)` dan `.eq("password", password)`

Risiko:
- Password disimpan dalam format teks biasa
- Tidak ada salting, hashing, atau password hashing standard
- Tidak ada upaya untuk menghindari brute force atau rate limiting
- Akses admin di sisi frontend sangat mudah dimanipulasi

Temuan:
- Critical

Implikasi ISO/IEC 27000:2026:
- Semua prinsip terkait access control, identity management, authentication, dan confidentiality belum terpenuhi dengan benar.

---

### 4.2 Session management tidak aman

Bukti implementasi:
- File: src/app/admin-login-umkm/page.tsx
- Setelah login: localStorage.setItem("umkm_admin_logged", "true")
- File: src/app/admin-dashboard/layout.tsx
- Pengecekan auth dilakukan melalui localStorage.getItem("umkm_admin_logged")

Risiko:
- localStorage dapat diubah oleh XSS atau manipulasi sisi browser
- Tidak ada expiration, session rotation, atau invalidation yang aman
- Tidak ada cookie HttpOnly/Secure/SameSite

Temuan:
- High

Implikasi ISO/IEC 27000:2026:
- Tidak memadai untuk session management dan access control yang terdokumentasi dengan baik.

---

### 4.3 Password disimpan tanpa enkripsi yang aman

Bukti implementasi:
- File: supabase_schema_updated.sql
- Tabel admins memiliki kolom `password TEXT NOT NULL`
- Data dummy admin juga disimpan dalam bentuk plaintext

Risiko:
- Jika database terbaca, semua akun admin dapat dicuri
- Kebocoran password akan berdampak langsung pada seluruh dashboard admin

Temuan:
- Critical

Rekomendasi:
- Gunakan Argon2, bcrypt, atau PBKDF2
- Simpan hash saja, bukan plaintext
- Jangan menyimpan credential dummy di SQL seed untuk produksi

---

### 4.4 RLS Supabase dibuat terlalu longgar

Bukti implementasi:
- File: supabase_schema_updated.sql
- Policy dibuat dengan `FOR ALL USING (true) WITH CHECK (true)` untuk semua tabel

Risiko:
- Setiap pengguna dapat membaca, memperbarui, atau menghapus data sensitif
- Admin, artikel, kategori, dan cache marketplace dapat diubah bila policy ini aktif

Temuan:
- Critical

Implikasi ISO/IEC 27000:2026:
- Aturan access control database tidak sesuai dengan prinsip least privilege dan segregation of duties.

---

### 4.5 Potensi Stored XSS pada konten artikel

Bukti implementasi:
- File: src/app/artikel/[slug]/page.tsx
- Render konten artikel menggunakan `dangerouslySetInnerHTML`

Risiko:
- Konten berbahaya dapat disimpan dari admin dan dijalankan di browser user
- Script JavaScript dapat mencuri session, memalsukan login, atau menjalankan malware

Temuan:
- High

Rekomendasi:
- Gunakan sanitasi HTML dengan DOMPurify
- Hindari rendering raw HTML dari data user
- Terapkan CSP untuk membatasi eksekusi skrip

---

### 4.6 Potensi SSRF pada endpoint validasi link

Bukti implementasi:
- File: src/app/api/validate-link/route.ts
- Route melakukan `fetch(url)` terhadap URL yang dikirim dari client tanpa validasi host yang ketat

Risiko:
- Server dapat dipakai untuk melakukan request ke endpoint internal, localhost, metadata cloud, atau alamat sensitif
- Dapat digunakan untuk mengeksfiltrasi informasi internal atau memicu akses ke layanan internal

Temuan:
- Critical

Rekomendasi:
- Batasi protocol menjadi HTTPS saja
- Allowlist host dan domain yang boleh diakses
- Blok port sensitif (22, 3306, 5432, 6379, 8080, dsb.)
- Hindari fetch arbitrary URL yang diinput user tanpa kontrol

---

### 4.7 Firewall / WAF / edge security tidak terdokumentasi

Bukti:
- File: next.config.ts hanya berisi template default, tidak ada konfigurasi keamanan

Risiko:
- Tidak ada lapisan keamanan edge yang terlihat
- Tidak ada bukti HSTS, CSP, X-Frame-Options, atau pemfilteran bot
- Aplikasi lebih rentan terhadap serangan web umum

Temuan:
- Medium

Rekomendasi:
- Aktifkan WAF pada layer hosting
- Terapkan rate limiting
- Gunakan security headers
- Gunakan CDN / reverse proxy dengan aturan keamanan yang jelas

---

## 5. Penetration Testing yang Disarankan

### 5.1 Skenario autentikasi
- Bypass login admin melalui edit localStorage
- Brute force username/password pada endpoint login admin
- Session fixation dan session hijacking

### 5.2 Skenario XSS
- Masukkan payload HTML/JS ke field artikel admin
- Cek apakah script dijalankan di halaman publik
- Uji payload seperti `<script>alert(1)</script>` dan SVG payload

### 5.3 Skenario SSRF
- Input URL `http://127.0.0.1:5432`
- Input URL `http://localhost/admin`
- Input URL metadata cloud seperti `http://169.254.169.254/latest/meta-data`

### 5.4 Skenario authorization
- Akses langsung ke route admin tanpa login
- Coba mengedit cookie atau localStorage untuk mendapatkan akses
- Uji apakah role dan privilege benar-benar dipisah

### 5.5 Skenario database access
- Coba query SQL injection pada input login atau filter admin
- Pastikan validasi input di server dilakukan dengan benar
- Verifikasi bahwa semua query ke Supabase dibatasi oleh rule yang tepat

---

## 6. Kesesuaian terhadap ISO/IEC 27000:2026

Secara umum, sistem ini belum memenuhi prinsip utama keamanan informasi yang diharapkan sesuai ISO/IEC 27000:2026, khususnya dalam aspek:

- Security governance dan risk management
- Access control
- Authentication and authorization
- Cryptographic controls
- Secure configuration
- Incident response readiness
- Security testing and validation

Penilaiannya:
- Status: belum siap untuk lingkungan produksi
- Tingkat risiko: tinggi
- Prioritas perbaikan: segera

---

## 7. Rekomendasi Prioritas

### Prioritas 0 (Segera)
1. Hentikan penggunaan password plaintext dan ganti dengan hash kuat
2. Hapus autentikasi berbasis localStorage dan ganti dengan cookie aman HttpOnly/Secure/SameSite
3. Kunci RLS Supabase agar hanya admin yang autentik terdaftar dapat mengakses data admin
4. Batasi akses publik hanya untuk data yang memang dibutuhkan publik
5. Pastikan semua akses administrasi di backend diverifikasi secara server-side

### Prioritas 1
1. Sanitasi semua render HTML dari konten admin
2. Implementasikan CSP, HSTS, X-Frame-Options, dan X-Content-Type-Options
3. Batasi SSRF di endpoint validate-link dengan allowlist domain, protocol, dan port
4. Tambahkan rate limiting pada endpoint login dan API sensitif
5. Buat log keamanan untuk semua aktivitas admin

### Prioritas 2
1. Aktifkan WAF dan keamanan edge di eksposur internet
2. Uji penetration testing secara berkala di environment staging
3. Jadwalkan review keamanan setiap perubahan aplikasi
4. Dokumentasikan kebijakan keamanan, akses, backup, dan recovery

---

## 8. Kesimpulan

Audit keamanan yang dilakukan terhadap UMKM Go Digital menunjukkan bahwa aplikasi memiliki celah keamanan yang signifikan dan harus dianggap belum aman untuk dipakai dalam skenario produksi. Masalah utama terletak pada:
- kontrol akses yang lemah
- password plaintext
- session management yang tidak aman
- RLS database yang terlalu longgar
- SSRF dan XSS
- kurangnya hardening keamanan sisi server dan hosting

Oleh karena itu, diperlukan remediation yang serius sebelum proyek ini dianggap siap dipublikasikan untuk penggunaan publik atau internal yang sensitif.

---

## 9. Status Final

Status keamanan: RED / Tidak Aman untuk Produksi

Rekomendasi: lakukan perbaikan fundamental, lalu ulang audit setelah remediation selesai.
