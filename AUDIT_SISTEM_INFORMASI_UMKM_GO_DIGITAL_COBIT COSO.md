# Audit Komprehensif Sistem Informasi UMKM Go Digital

Versi Terbaru: 3.0 | Fokus utama: COBIT 2019 (domain BAI dan DSS) dengan pendukung COSO

## 1. Latar Belakang dan Tujuan Audit

Audit ini dilakukan untuk mengevaluasi tingkat keamanan, integritas data, pengendalian transaksi, dan tata kelola sistem informasi pada aplikasi UMKM Go Digital. Fokus audit mencakup aspek kritikal berikut:

- validasi input data,
- otoritas transaksi dan kontrol akses,
- autentikasi pengguna dan pengelolaan kredensial,
- proses operasional admin dan data entry,
- akuntabilitas perubahan data,
- serta pengendalian risiko dan tata kelola TI.

Tujuan audit adalah untuk menilai sejauh mana aplikasi dan sistem informasi ini memenuhi prinsip pengendalian yang sehat, khususnya berdasarkan kerangka kerja COBIT sebagai kerangka utama dan COSO sebagai pendukung. Audit ini juga bertujuan mengidentifikasi celah kontrol yang berpotensi mengganggu keandalan sistem, integritas data, keamanan informasi, serta keberlangsungan operasional.

---

## 2. Metodologi Audit

Audit ini menggunakan kombinasi pendekatan berikut:

1. COBIT 2019 sebagai kerangka utama, khususnya domain BAI dan DSS.
2. COSO Internal Control – Integrated Framework sebagai kerangka pendukung untuk menilai lingkungan pengendalian, risiko, dan monitoring intern.
3. Review terhadap aplikasi, database, pola akses, validasi input, dan alur admin yang tampak di kode sumber dan SQL schema.

Sumber observasi utama:

- [src/app/admin-login-umkm/page.tsx](src/app/admin-login-umkm/page.tsx)
- [src/app/admin-dashboard/layout.tsx](src/app/admin-dashboard/layout.tsx)
- [src/app/admin-dashboard/analisa-harga/page.tsx](src/app/admin-dashboard/analisa-harga/page.tsx)
- [src/app/admin-reset-password/page.tsx](src/app/admin-reset-password/page.tsx)
- [supabase_schema_updated.sql](supabase_schema_updated.sql)
- [README.md](README.md)

---

## 3. Kerangka Kerja Audit: COBIT sebagai Kerangka Utama

COBIT dipilih sebagai kerangka utama karena aplikasi ini merupakan sistem informasi berbasis TI dengan kebutuhan pengendalian pada:

- keamanan informasi,
- proses transaksi dan operasi,
- konfigurasi aplikasi dan database,
- integritas data,
- pengelolaan perubahan,
- monitoring dan operasional TI.

Domain COBIT yang paling relevan untuk aplikasi ini adalah:

- BAI03 – Manage Routines
- BAI06 – Manage Changes
- BAI08 – Manage Knowledge
- BAI10 – Manage Configuration
- DSS01 – Manage Operations
- DSS02 – Manage Service Requests and Incidents
- DSS03 – Manage Problems
- DSS04 – Manage Continuity
- DSS05 – Manage Security Services
- DSS06 – Manage Business Process Controls
- DSS07 – Manage Operations and Incidents

COSO digunakan sebagai pendukung untuk menguji:

- Control Environment,
- Risk Assessment,
- Control Activities,
- Information and Communication,
- Monitoring.

Kombinasi ini memberi perspektif yang lebih komprehensif: COBIT menilai governance TI dan kontrol proses teknologi, sedangkan COSO menilai tata kelola organisasi dan lingkungan pengendalian secara keseluruhan.

---

## 4. Ringkasan Temuan Utama

| Area | Temuan | Dampak | Tingkat Risiko |
|---|---|---|---|
| Validasi Data | Validasi hanya bersifat parsial dan sebagian besar di sisi klien | Data invalid masuk ke sistem | Tinggi |
| Autentikasi | Login berbasis username/password langsung, tanpa mekanisme aman | Akses tidak sah dan manipulasi data | Kritis |
| Session & Authorization | Login diawasi dengan localStorage semata | User bisa memanipulasi status akses | Kritis |
| Database Security | RLS dibuat longgar sehingga semua operasi diperbolehkan | Data sensitif terbuka untuk publik | Kritis |
| Password Management | Password default dan plain text ditemukan | Risiko kebocoran kredensial | Kritis |
| Audit Trail | Tidak ada log aktivitas perubahan data | Sulit lakukan rekonstruksi dan akuntabilitas | Tinggi |
| Governance | Belum ada paling tidak pemisahan peran admin, reviewer, dan auditor | Risiko fraud dan human error | Tinggi |
| Availability | Tidak ada mekanisme kontrol backup, continuity, atau incident response | Berisiko kehilangan data | Sedang-Tinggi |

---

## 5. Analisis Mendalam Berdasarkan Domain BAI dan DSS

### 5.1 BAI03 – Manage Routines

Prinsip:
Pengelolaan proses rutin harus terdokumentasi, repetitif, konsisten, dan terkontrol untuk menjamin integritas operasional.

Temuan:
- prosedur login admin, reset password, serta pengelolaan data tidak memiliki batasan kontrol yang kuat,
- validasi input hanya bersifat parsial dan tidak dibangun sebagai proses rutin yang konsisten,
- operasi transaksi di admin dashboard belum memiliki mekanisme review atau exception handling yang terdokumentasi.

Kesenjangan:
- tidak ada SOP yang jelas untuk penggunaan admin dashboard,
- tidak ada prosedur operational control untuk pengecekan input data,
- tidak ada penetapan penerima tanggung jawab atas hasil update data.

Dampak:
- proses operasional menjadi tidak konsisten,
- risiko human error meningkat,
- data yang masuk tidak dapat dijamin kualitasnya.

---

### 5.2 BAI06 – Manage Changes

Prinsip:
Perubahan pada aplikasi, data, dan konfigurasi harus dikelola secara terstruktur agar risiko operasional dan keamanan dapat diminimalkan.

Temuan:
- perubahan data admin dan harga pasar tidak dicatat dengan log yang lengkap,
- tidak ada mekanisme change approval untuk update data sensitif,
- konfigurasi database dan kebijakan akses dibuat secara terbuka tanpa pemeriksaan keamanan.

Kesenjangan:
- tidak ada control ownership atas perubahan data,
- tidak ada dokumentasi proses perubahan,
- pelaku perubahan tidak dapat dibuktikan secara auditabilitas.

Dampak:
- perubahan data sulit ditelusuri,
- risiko manipulasi data tinggi,
- tidak ada rekam jejak untuk investigasi dan perbaikan.

---

### 5.3 BAI08 – Manage Knowledge

Prinsip:
Pengetahuan organisasi yang berkaitan dengan sistem dan pengendalian harus dikelola untuk mendukung efisiensi dan akuntabilitas.

Temuan:
- tidak ada dokumentasi resmi tentang alur admin,
- tidak ada deskripsi akses, peran, dan pembagian tugas,
- tidak ada panduan operasional untuk login admin, reset password, atau perubahan data.

Kesenjangan:
- terdapat dependence pada pemahaman informal dari pembuat aplikasi,
- risiko kehilangan knowledge ketika admin berubah atau project berpindah tangan.

Dampak:
- operasional menjadi rentan terhadap single point of failure,
- continuity organisasi terganggu.

---

### 5.4 BAI10 – Manage Configuration

Prinsip:
Konfigurasi aplikasi dan database harus dikendalikan agar tidak berubah secara tidak sah dan tidak menimbulkan celah keamanan.

Temuan:
- kebijakan Supabase dibuat longgar dengan FOR ALL USING (true) dan WITH CHECK (true),
- tidak ada batasan peran, akses per entitas, atau pernyataan least privilege,
- tidak ada kontrol terhadap perubahan konfigurasi dan kebijakan keamanan database.

Kesenjangan:
- konfigurasi keamanan tidak sesuai prinsip least privilege,
- aplikasi tidak dirancang dengan lingkungan production hardening.

Dampak:
- data sensitif dapat dibaca dan diubah oleh pihak yang tidak berwenang,
- ancaman keamanan meningkat signifikan.

---

### 5.5 DSS01 – Manage Operations

Prinsip:
Operasi sistem harus dijalankan sesuai prosedur yang terkontrol dan terdokumentasi.

Temuan:
- tidak ada definisi operasional yang jelas untuk job admin dan aktivitas rutin,
- manajemen data tidak memiliki checklist atau pengecekan kualitas,
- tidak ada standard operating procedure untuk pengelolaan data yang kritikal.

Dampak:
- operasional lebih rawan terhadap kesalahan,
- kontrol tidak konsisten antar masa operasional.

---

### 5.6 DSS02 – Manage Service Requests and Incidents

Prinsip:
Permintaan layanan dan insiden harus dikelola secara terstruktur untuk memastikan cepatnya respons dan pemulihan.

Temuan:
- tidak ada proses pencatatan insiden atau laporan keamanan,
- tidak ada mekanisme escalation ketika login gagal berulang,
- tidak ada proses pemulihan ketika akses admin atau data rusak.

Dampak:
- gangguan dapat berlangsung lama,
- organisasi tidak siap menghadapi ancaman atau kejadian keamanan.

---

### 5.7 DSS03 – Manage Problems

Prinsip:
Masalah sistem harus diidentifikasi, didokumentasikan, dianalisis, dan diselesaikan agar tidak berulang.

Temuan:
- tidak ada bukti proses root cause analysis atau issue tracking,
- tidak ada dokumentasi perbaikan yang terstruktur,
- tidak ada mekanisme pengendalian untuk mencegah error berulang pada autentikasi dan validasi input.

Dampak:
- bug dan celah keamanan cenderung terulang,
- perbaikan bersifat reaktif, bukan preventif.

---

### 5.8 DSS04 – Manage Continuity

Prinsip:
Sistem harus memiliki kemampuan pemulihan agar layanan tetap berfungsi walaupun terjadi gangguan.

Temuan:
- tidak ada indikator backup data, restore procedure, atau business continuity plan,
- tidak ada jelasnya mekanisme recovery untuk data admin atau admin dashboard,
- aplikasi bergantung pada database yang dipengaruhi secara langsung oleh konfigurasi keamanan yang longgar.

Dampak:
- data berisiko hilang atau rusak,
- downtime dapat terjadi tanpa proses recovery yang cukup.

---

### 5.9 DSS05 – Manage Security Services

Prinsip:
Keamanan harus diterapkan melalui kontrol identitas, otorisasi, enkripsi, dan monitoring.

Temuan:
- password admin disimpan dan dibandingkan secara plain text,
- login admin tidak mengadopsi mekanisme session server-side,
- localStorage dipakai untuk menjaga status login,
- tidak ada kriteria password kuat atau password policy,
- tidak ada lockout policy untuk percobaan login berulang,
- tidak ada review akses, rotasi akun, atau terminasi akun otomatis.

Dampak:
- ancaman penyusupan sangat tinggi,
- pencurian kredensial dapat terjadi dengan mudah,
- integritas sistem sangat terganggu.

---

### 5.10 DSS06 – Manage Business Process Controls

Prinsip:
Kontrol harus diterapkan pada proses bisnis utama untuk memastikan bahwa transaksi dan kegiatan operasional berjalan sesuai kebijakan.

Temuan:
- validasi input tidak konsisten di seluruh form,
- proses update data analisa harga tidak memiliki approval atau review sebelum perubahan berlaku,
- tidak ada pertimbangan segregation of duties atau independent review.

Dampak:
- transaksi dapat dilakukan tanpa pengawasan,
- kemungkinan kesalahan dan penipuan meningkat,
- kualitas keputusan bisnis menurun.

---

### 5.11 DSS07 – Manage Operations and Incidents

Prinsip:
Semua aktivitas operasi dan insiden harus dapat dideteksi, dijurnal, dan ditangani.

Temuan:
- tidak ada log aktivitas untuk create, update, delete pada data penting,
- tidak ada alur event reporting untuk perubahan hak akses atau data sensitif,
- tidak ada monitoring penggunaan admin dan perubahan status data secara periodik.

Dampak:
- tidak mungkin membuktikan akun siapa yang melakukan perubahan,
- sulit melakukan investigasi atas insiden keamanan,
- organisasi tidak dapat menjamin accountability.

---

## 6. Analisis terhadap COSO

COSO digunakan untuk menilai pengendalian internal pada level organisasi dan proses. Dalam konteks aplikasi ini, COSO menunjukkan sejumlah kelemahan yang signifikan.

### 6.1 Control Environment

Temuan:
- belum ada budaya kontrol yang jelas,
- belum ada kebijakan keamanan yang serius dan terukur,
- peran dan tanggung jawab tidak dipisahkan secara jelas.

Penilaian:
Lemah.

### 6.2 Risk Assessment

Temuan:
- risiko keamanan, data integrity, dan fraud tidak dikelola formal atau terdokumentasi,
- potensi kerentanan keamanan tidak dikaitkan dengan control objective yang jelas.

Penilaian:
Belum memadai.

### 6.3 Control Activities

Temuan:
- validasi input dan otorisasi tidak memadai,
- tidak ada approval workflow,
- tidak ada review transaksi penting,
- tidak ada segregation of duties.

Penilaian:
Lemah dan tidak siap untuk produksi.

### 6.4 Information and Communication

Temuan:
- tidak ada pengelolaan informasi yang memadai mengenai peran, hak akses, dan perubahan data,
- tidak ada komunikasi formal antar admin, pengembang, dan pihak yang bertanggung jawab.

Penilaian:
Tidak efektif.

### 6.5 Monitoring

Temuan:
- tidak ada log aktivitas yang dapat dipantau,
- tidak ada review berkala atas akses dan perubahan data,
- tidak ada mekanisme monitoring terhadap insiden atau transaksi kritikal.

Penilaian:
Sangat lemah.

---

## 7. Matrik Risiko

| Kategori Risiko | Deskripsi | Kemungkinan | Dampak | Tingkat Risiko |
|---|---|---|---|---|
| Security breach | Akses tidak sah terhadap admin panel dan database | Tinggi | Sangat tinggi | Kritis |
| Fraud data manipulation | Pengubahan data harga atau artikel tanpa otorisasi | Tinggi | Tinggi | Kritis |
| Data integrity failure | Input tidak valid atau perubahan tidak terdokumentasi | Tinggi | Tinggi | Kritis |
| Password compromise | Password default dan plain text | Tinggi | Tinggi | Kritis |
| Operational disruption | Tidak ada backup/restore dan incident handling | Sedang | Tinggi | Tinggi |
| Governance failure | Tidak ada pemisahan tugas dan akuntabilitas | Tinggi | Tinggi | Tinggi |

---

## 8. Integrasi COBIT dan COSO dalam Audit Ini

Pendekatan gabungan ini menunjukkan bahwa:

- COBIT menjelaskan kontrol TI yang dibutuhkan untuk pengelolaan data, keamanan, operasional, dan perubahan;
- COSO menjelaskan apakah lingkungan organisasi memiliki kemampuan untuk menjalankan kontrol tersebut secara efektif.

Pada aplikasi ini, masalah utama tidak hanya pada perangkat lunak, tetapi juga pada tata kelola. Audit menunjukkan bahwa pengendalian TI belum dibangun di level yang memadai, bahkan ketika arahan strategis dan business process sudah ada. Oleh karena itu, pembenahan harus dilakukan secara bersamaan pada komponen teknis dan organisasi.

---

## 9. Kesimpulan Auditor

Berdasarkan evaluasi mendalam terhadap aplikasi dan basis data, sistem UMKM Go Digital masih memiliki celah kontrol yang serius dan material. Masalah utama terletak pada:

1. autentikasi yang tidak aman,
2. otorisasi yang tidak dikelola dengan benar,
3. validasi input yang tidak memadai,
4. kebijakan database yang terlalu longgar,
5. tidak adanya audit trail yang memadai,
6. lemahnya governance dan pemisahan tugas,
7. tidak ada mekanisme monitoring dan continuity yang memadai.

Secara komprehensif, audit menunjukkan bahwa sistem ini belum layak digunakan pada lingkungan produksi yang memerlukan pengendalian informasi yang kuat. Risiko terhadap integritas data, keamanan, dan akuntabilitas transaksi tergolong tinggi.

---

## 10. Status Keputusan Audit

Status audit: Material Weakness / High Risk

Rekomendasi status formal:
- Tidak layak untuk production tanpa remediasi yang signifikan.
- Harus diperbaiki pada level keamanan, otorisasi, validasi, dan monitoring otomatis.

---

## 11. Rekomendasi Prioritas Berbasis COBIT dan COSO

### Prioritas 1 — Security dan Authorization

- migrasikan autentikasi ke mekanisme server-side yang aman,
- hash password menggunakan bcrypt atau argon2,
- hapus akun default dan password default,
- terapkan role-based access control (RBAC),
- batasi semua akses query database hanya untuk peran tertentu,
- terapkan policy lockout untuk percobaan login yang gagal,
- aktifkan paling tidak session timeout dan audit login.

### Prioritas 2 — Data Integrity dan Input Validation

- lakukan validasi input pada sisi server untuk semua form,
- sanitasi data terhadap karakter berbahaya,
- validasi URL, numerik, kategori, format, dan panjang field,
- pastikan data yang masuk konsisten dengan aturan bisnis,
- batasi value set untuk marketplace, kategori, dan status data.

### Prioritas 3 — Audit Trail dan Monitoring

- buat tabel audit_log untuk capture insert, update, delete,
- catat user, timestamp, old value, new value, dan alasan perubahan,
- tambahkan monitoring aktivitas admin secara periodik,
- buat dashboard notifikasi untuk akses tidak normal.

### Prioritas 4 — Governance and Segregation of Duties

- buat pemisahan peran antara admin content, admin data, dan admin keamanan,
- tetapkan owner atas setiap perubahan,
- lakukan review akses dan role minimal setiap bulan,
- dokumentasikan SOP admin dan mekanisme approval.

### Prioritas 5 — Business Continuity dan Incident Management

- buat rencana pemulihan data dan backup otomatis,
- dokumentasikan prosedur recovery,
- siapkan mekanisme incident response untuk akses mencurigakan atau data hilang,
- lakukan simulasi insiden secara berkala.

---

## 12. Penutup

Audit ini menegaskan bahwa pengendalian internal sistem informasi dan tata kelola TI belum sepenuhnya dibangun. Berdasarkan COBIT sebagai kerangka utama, terdapat celah besar pada BAI dan DSS yang berdampak langsung pada keamanan, integritas data, dan akuntabilitas transaksi. COSO memperkuat bahwa pengendalian organisasi, lingkungan kontrol, dan monitoring internal juga belum cukup kuat untuk menjamin tata kelola yang sehat.

Oleh karena itu, langkah remediasi harus segera dilakukan sebelum sistem dipergunakan secara luas. Jika sistem ini berpotensi dipakai untuk data dan transaksi bisnis yang lebih penting, maka perbaikan kontrol harus dilakukan secara prioritas, terukur, dan dibuktikan melalui bukti audit yang terkonsolidasi.
