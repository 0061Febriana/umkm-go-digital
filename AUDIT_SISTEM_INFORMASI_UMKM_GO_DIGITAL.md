# Audit Sistem Informasi dan Aplikasi UMKM Go Digital

## 1. Latar Belakang

Dokumen ini dibuat sebagai hasil audit kritis terhadap aplikasi UMKM Go Digital, dengan fokus pada tiga aspek utama:

- validasi input data,
- otoritas transaksi,
- riwayat aktivitas / audit trail.

Audit dilakukan menggunakan pendekatan pengendalian internal yang berorientasi pada prinsip COSO dan kerangka kerja COBIT, khususnya domain BAI (Build, Acquire, and Implement) dan DSS (Deliver, Service, and Support).

---

## 2. Tujuan Audit

Tujuan audit ini adalah untuk:

1. mengevaluasi tingkat keamanan dan integritas data aplikasi,
2. menilai efektivitas pengendalian akses dan otorisasi,
3. mengidentifikasi celah validasi input yang dapat menimbulkan risiko data quality,
4. menilai apakah transaksi admin dan data sensitif memiliki jejak aktivitas yang memadai,
5. memberikan rekomendasi yang dapat ditindaklanjuti untuk perbaikan kontrol internal.

---

## 3. Scope Audit

Scope audit mencakup komponen utama berikut:

- autentikasi admin,
- pengelolaan admin dan akses dashboard,
- validasi form input admin,
- operasi CRUD terhadap data marketplace_price_cache,
- penggunaan Supabase dan kebijakan RLS,
- proses reset password admin,
- audit trail / riwayat aktivitas sistem.

Sumber evaluasi utama:

- [src/app/admin-login-umkm/page.tsx](src/app/admin-login-umkm/page.tsx)
- [src/app/admin-dashboard/layout.tsx](src/app/admin-dashboard/layout.tsx)
- [src/app/admin-dashboard/analisa-harga/page.tsx](src/app/admin-dashboard/analisa-harga/page.tsx)
- [supabase_schema_updated.sql](supabase_schema_updated.sql)
- [README.md](README.md)

---

## 4. Ringkasan Temuan Utama

| Area | Temuan | Dampak | Tingkat Risiko |
|---|---|---|---|
| Validasi input data | Validasi hanya dilakukan di sisi klien dan bersifat parsial | Risiko data tidak valid, manipulasi input, dan potensi injeksi | Tinggi |
| Otoritas transaksi | Autentikasi admin lemah dan access control tidak terpisah dengan benar | Akses tidak sah ke fungsi admin dan data sensitif | Kritis |
| Riwayat aktivitas | Tidak ada audit log untuk transaksi CRUD | Sulit memonitor perubahan, menghitung tanggung jawab, dan mendeteksi fraud | Tinggi |
| Password management | Password admin disimpan dan dibandingkan sebagai plain text | Risiko keamanan dan kebocoran kredensial | Kritis |
| RLS database | Semua tabel diberi policy FOR ALL USING (true) | Siapapun dapat membaca/mengubah data yang seharusnya terbatas | Kritis |

---

## 5. Audit Detail

### 5.1 Validasi Input Data

Pada form admin untuk analisa harga, validasi yang diterapkan masih terbatas. Dalam file [src/app/admin-dashboard/analisa-harga/page.tsx](src/app/admin-dashboard/analisa-harga/page.tsx), sistem hanya mengecek:

- apakah nama produk diisi,
- apakah harga lebih dari 0,
- apakah link produk diisi.

Namun belum ada kontrol terhadap:

- validasi format URL yang benar,
- panjang karakter maksimum,
- sanitasi karakter berbahaya,
- validasi server-side,
- pengecekan duplikasi data,
- konfirmasi apakah marketplace sesuai dengan URL,
- validasi tipe data numerik sebelum masuk ke database.

#### Risiko

Tanpa validasi yang kuat, input yang tidak terkontrol dapat masuk ke sistem dan merusak integritas data, mengganggu kualitas analisa harga, serta menimbulkan potensi keamanan dari injeksi dan manipulasi data.

#### Hubungan dengan COSO dan COBIT

- COSO: Control Activities
- COBIT BAI03, BAI10, DSS06

Prinsipnya: setiap transaksi dan input harus diawasi agar data yang masuk valid, konsisten, dan sesuai kebijakan organisasi.

---

### 5.2 Otoritas Transaksi dan Akses

#### 5.2.1 Autentikasi admin lemah
Pada [src/app/admin-login-umkm/page.tsx](src/app/admin-login-umkm/page.tsx), proses login hanya memeriksa username dan password terhadap tabel admins di Supabase. Password tidak di-hash, dan autentikasi tidak dilaksanakan melalui mekanisme aman seperti session server-side atau token yang dikelola secara aman.

#### 5.2.2 Keamanan front-end berbasis localStorage
Pada [src/app/admin-dashboard/layout.tsx](src/app/admin-dashboard/layout.tsx), status login hanya dicek melalui localStorage dengan nilai "umkm_admin_logged". Ini bukan kontrol autentikasi yang kuat karena nilai di browser mudah dimanipulasi.

#### 5.2.3 RLS dan policy database sangat terbuka
Pada [supabase_schema_updated.sql](supabase_schema_updated.sql), tabel seperti admins, articles, categories, dan marketplace_price_cache telah di-enable RLS, tetapi policy ditetapkan sebagai:

- FOR ALL USING (true)
- WITH CHECK (true)

Artinya semua pengguna dapat melakukan operasi CRUD pada data tersebut. Ini adalah celah serius karena ia membuka akses publik ke data sensitif dan fungsi transaksi admin.

#### 5.2.4 Password default di-hardcode
Pada file yang sama, terdapat insert data admin default:

- username: admin
- password: umkm2025

Ini merupakan praktik yang tidak aman dan tidak sesuai dengan prinsip pengendalian akses yang baik.

#### Risiko

- akses tidak sah ke dashboard admin,
- manipulasi data artikel dan harga pasar,
- kebocoran data yang seharusnya hanya untuk admin,
- tinggi kemungkinan penyalahgunaan akun internal.

#### Hubungan dengan COSO dan COBIT

- COSO: Control Environment, Information & Communication, Control Activities
- COBIT DSS05, DSS06

Prinsipnya: otorisasi harus dikelola dengan least privilege, separation of duties, dan pengendalian akses yang ditegakkan di server.

---

### 5.3 Riwayat Aktivitas / Audit Trail

Tidak ditemukan mekanisme pencatatan aktivitas transaksi seperti:

- siapa yang mengubah data,
- kapan perubahan dilakukan,
- apa yang berubah,
- apakah ada approval sebelum perubahan,
- apakah ada jurnal transaksi yang dapat ditelusuri.

Pada proses tambah, edit, dan hapus data analisa harga di [src/app/admin-dashboard/analisa-harga/page.tsx](src/app/admin-dashboard/analisa-harga/page.tsx), tidak ada log aktivitas di database maupun di aplikasi.

#### Risiko

Jika terjadi perubahan yang merugikan, organisasi tidak dapat melakukan rekonstruksi kejadian, membuktikan akuntabilitas, atau menilai apakah perubahan dilakukan secara sah.

#### Hubungan dengan COSO dan COBIT

- COSO: Monitoring
- COBIT DSS07, BAI06

Prinsipnya: setiap aktivitas yang material harus dapat dideteksi, direkam, dan ditinjau secara periodik.

---

## 6. Evaluasi terhadap COSO

### 6.1 Control Environment

Kondisi saat ini menunjukkan lingkungan pengendalian yang lemah karena:

- tidak ada clear segregation of duties,
- tidak ada kebijakan akses yang tegas,
- tidak ada prosedur password management yang aman,
- tidak ada kesadaran terhadap tanggung jawab kontrol.

### 6.2 Risk Assessment

Risiko yang dihadapi belum dikelola secara formal, terutama terkait:

- data integrity,
- fraud dan unauthorized access,
- data privacy,
- operational continuity.

### 6.3 Control Activities

Pengendalian yang ada masih sangat minim, terutama untuk:

- validasi input,
- review otorisasi,
- pemisahan peran,
- pemantauan aktivitas.

### 6.4 Information & Communication

Informasi dan komunikasi internal belum terbentuk dengan baik karena tidak ada mekanisme pelaporan, notifikasi, atau log aktivitas.

### 6.5 Monitoring

Monitoring masih lemah. Tidak ada mekanisme review atas perubahan admin, akses, dan data transaksi secara berkala.

---

## 7. Evaluasi terhadap COBIT (Domain BAI dan DSS)

### Domain BAI

#### BAI03 – Manage Routines
Prosedur operasional untuk pengelolaan data belum diatur secara kuat. Validasi input dan proses penyimpanan data belum mengadopsi kontrol rutin yang konsisten.

#### BAI10 – Manage Configuration
Konfigurasi keamanan database dan akses belum sesuai dengan best practice. Policy keamanan yang terbuka membuat sistem tidak siap untuk lingkungan produksi.

### Domain DSS

#### DSS05 – Manage Security Services
Akses dan keamanan belum dikelola dengan baik. Autentikasi, authorization, dan password management tidak memenuhi kebutuhan keamanan minimum.

#### DSS06 – Manage Business Process Controls
Kontrol proses bisnis tidak terdefinisi dengan benar, terutama untuk pengelolaan data sensitif dan transaksi admin.

#### DSS07 – Manage Operations and Incidents
Tidak ada pemantauan dan penanganan insiden maupun aktivitas penting.

---

## 8. Kesimpulan Auditor

Berdasarkan pengamatan terhadap aplikasi dan konfigurasi sistem, dapat disimpulkan bahwa:

1. validasi input data belum cukup kuat,
2. otoritas transaksi dan akses admin tidak memadai,
3. riwayat aktivitas tidak tersedia,
4. konfigurasi database membuka akses publik ke data sensitif,
5. sistem belum memenuhi prinsip dasar pengendalian intern yang sehat.

### Status final

Status: Material Weakness / High Risk

Sistem ini belum layak untuk digunakan dalam lingkungan produksi tanpa remediasi yang signifikan.

---

## 9. Rekomendasi Prioritas

### Prioritas 1: Security & Access Control

- ganti autentikasi admin yang berbasis localStorage dengan session/server-side auth yang aman,
- simpan password dengan hash yang aman (misalnya bcrypt atau argon2),
- hapus credential default dan pastikan no default password,
- batasi akses database dengan role-based access control,
- buat policy RLS yang membatasi operasi hanya untuk role tertentu.

### Prioritas 2: Validasi Data

- tambahkan validasi server-side untuk semua field,
- sanitasi input sebelum penyimpanan,
- validasi URL, format numerik, dan panjang field,
- batasi kategori dan nilai yang boleh masuk ke database.

### Prioritas 3: Audit Trail

- buat tabel audit_log,
- catat user, waktu, operasi, data lama, data baru,
- buat trigger database untuk mencatat update/delete/insert,
- lakukan review berkala atas log aktivitas.

### Prioritas 4: Governance

- tetapkan pemisahan tugas antara admin content, admin data, dan admin keamanan,
- buat SOP penggunaan dashboard admin,
- lakukan review akses berkala,
- dokumentasikan prosedur pengelolaan transaksi dan perubahan data.

---

## 10. Penutup

Audit ini menegaskan bahwa aplikasi UMKM Go Digital memerlukan perbaikan mendasar dalam pengendalian keamanan dan integritas data. Jika perbaikan tidak dilakukan, risiko kebocoran data, manipulasi data, dan akses tidak sah akan terus meningkat.

Rekomendasi di atas harus menjadi dasar prioritas perbaikan sebelum sistem dipergunakan secara luas atau diintegrasikan dengan proses bisnis yang lebih kritikal.
