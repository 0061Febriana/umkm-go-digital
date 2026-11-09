# Rencana Remediasi Keamanan Informasi
# UMKM Go Digital

Tanggal: 2026-11-09
Status: Prioritas tinggi

---

## 1. Tujuan

Dokumen ini berfungsi sebagai rencana kerja remediasi untuk menutup celah keamanan utama yang ditemukan pada audit ISO/IEC 27000:2026. Tujuannya adalah menurunkan risiko yang berkaitan dengan:
- akses admin yang tidak aman
- password plaintext
- RLS database yang terlalu longgar
- XSS dan SSRF
- hardening aplikasi dan infrastruktur yang belum memadai

---

## 2. Ringkasan Status

| Area | Status | Prioritas | Risiko |
|--- |--- |--- |--- |
| Autentikasi admin | Belum aman | P1 | Critical |
| Manajemen password | Tidak aman | P1 | Critical |
| RLS / database access | Tidak aman | P1 | Critical |
| SSRF | Tidak aman | P1 | Critical |
| XSS pada konten artikel | Tidak aman | P1 | High |
| Security headers & hardening | Kurang | P2 | Medium-High |
| WAF / firewall / monitoring | Tidak terdefinisi | P2 | Medium |

---

## 3. Definisi Prioritas

### Prioritas P1 (wajib sebelum production)
- semua celah Critical harus ditutup
- autentikasi dan authorization harus diperbaiki dengan prinsip least privilege
- komunikasi dan data sensitif harus diamankan dengan enkripsi yang benar

### Prioritas P2 (setelah stabilisasi)
- hardening aplikasi, monitoring, logging, security headers
- WAF / gateway keamanan
- proses pentest dan review keamanan berkala

---

## 4. Rencana Tindakan

### 4.1 Penguatan autentikasi admin

Tujuan:
- mengganti mekanisme login yang tidak aman
- menghilangkan dependency pada localStorage untuk status autentikasi

Tindakan:
1. Hapus query login yang membandingkan password langsung dari database
2. Gunakan password hashing dengan Argon2, bcrypt, atau PBKDF2
3. Implementasikan session server-side dengan cookie HttpOnly, Secure, SameSite
4. Tambahkan expiration session, logout semua sesi, dan rotation token
5. Tambahkan rate limiting dan lockout untuk login

Target penerimaan:
- password tidak pernah disimpan dalam plaintext
- status login tidak bergantung pada localStorage
- autentikasi server-side valid

---

### 4.2 Penguatan kontrol akses database

Tujuan:
- mengurangi privilege publik samapai nol untuk data sensitif

Tindakan:
1. Batasi semua policy RLS untuk peran authenticated/admin saja
2. Untuk data publik, izinkan read-only sesuai kebutuhan
3. Hindari `FOR ALL USING (true)` untuk tabel sensitif
4. Tambahkan fungsi server-side untuk operasi admin yang sensitif
5. Audit semua tabel: admins, articles, categories, marketplace_price_cache

Target penerimaan:
- anon tidak punya akses write
- update/delete hanya bisa dilakukan oleh admin yang terotentikasi
- semua operasi data dilindungi oleh role-based access control

---

### 4.3 Enkripsi dan penyimpanan credential

Tujuan:
- memastikan data sensitif tidak disimpan tanpa perlindungan

Tindakan:
1. Ganti semua field password dari teks biasa menjadi hash yang aman
2. Hapus dummy credential plaintext dari SQL seed untuk environment production
3. Simpan secret hanya di environment variable / secret manager
4. Aktifkan koneksi aman ke database dan layanan cloud
5. Enforce HTTPS di seluruh sisi publik

Target penerimaan:
- data password tidak bisa dibaca langsung dari database
- semua komunikasi menggunakan TLS
- semua secret di luar repository

---

### 4.4 Mitigasi SSRF

Tujuan:
- mencegah server melakukan request ke sumber internal yang tidak diizinkan

Tindakan:
1. Batasi protocol ke HTTPS saja, jika perlu
2. Buat allowlist domain dan host yang diizinkan
3. Blok port sensitif seperti 22, 3306, 5432, 6379, 8080, 9090
4. Validasi URL sebelum request dilakukan
5. Tambahkan timeout dan pembatas ukuran respons
6. Nonaktifkan fetch arbitrary URL dari client input tanpa kontrol

Target penerimaan:
- server hanya dapat mengakses host yang diizinkan
- request tidak masuk ke jaringan internal

---

### 4.5 Mitigasi Stored XSS

Tujuan:
- mencegah eksekusi javascript dari input konten admin

Tindakan:
1. Hapus penggunaan `dangerouslySetInnerHTML` untuk data yang bukan trusted
2. Gunakan sanitizer HTML seperti DOMPurify untuk data yang perlu dirender sebagai HTML
3. Terapkan Content Security Policy (CSP)
4. Validasi input server-side pada semua field artikel
5. Batasi markup HTML yang diizinkan

Target penerimaan:
- input admin tidak dapat mengeksekusi script pada halaman publik
- semua konten yang dirender bersifat aman

---

### 4.6 Peningkatan hardening aplikasi dan infrastruktur

Tujuan:
- membangun lapisan keamanan dasar sesuai kontrol modern

Tindakan:
1. Tambahkan security headers pada Next.js
   - Content-Security-Policy
   - Strict-Transport-Security
   - X-Frame-Options
   - X-Content-Type-Options
   - Referrer-Policy
2. Gunakan rate limiting untuk login dan API sensitif
3. Aktifkan peringatan dan logging untuk aktivitas admin
4. Aktifkan WAF atau reverse proxy security layer di hosting
5. Cek konfigurasi deployment untuk HTTPS, RBAC, dan secret management

Target penerimaan:
- semua request ke aplikasi memiliki header keamanan yang memadai
- aktivitas administratif tercatat dengan audit trail

---

## 5. Penetration Testing Pasca Remediasi

Setelah perbaikan dilakukan, sistem harus menjalani pengujian keamanan berikut:

1. Authentication testing
2. Authorization testing
3. XSS payload validation
4. SSRF validation
5. Session hijacking and fixation testing
6. Database policy validation
7. API abuse and rate-limit testing

Target:
- semua temuan Critical dan High dinyatakan tertutup
- tidak ada issue critical pada environment staging

---

## 6. Timeline Rekomendasi

### Minggu 1
- revisi login admin
- hash password
- perbaikan RLS

### Minggu 2
- SSRF mitigation
- XSS sanitization
- implementasi security headers

### Minggu 3
- rate limiting, logging, monitoring
- WAF / hardening deployment
- pentest staging

---

## 7. Exit Criteria

Sistem dapat dianggap siap produksi jika terpenuhi kriteria berikut:
- semua akun admin menggunakan password yang di-hash
- session management aman dan server-side
- tidak ada kemampuan anon untuk mengubah data sensitif
- SSRF tertutup dengan allowlist dan validasi yang ketat
- XSS dan HTML injection tertutup
- semua endpoint sensitif memiliki rate limiting
- hasil pentest staging menunjukkan tidak ada issue Critical/High yang tersisa

---

## 8. Catatan Auditor

Audit ini menunjukkan bahwa sistem belum siap untuk produksi. Remediasi harus diprioritaskan dengan pendekatan yang berorientasi pada risk-based security, bukan hanya perbaikan UI. Fokus utama harus pada:
- access control
- credential protection
- secure coding
- database authorization
- server-side validation

Tanpa perbaikan ini, risiko terhadap admin, data pengguna, dan integritas platform tetap tinggi.
