# Audit Tata Kelola Teknologi Informasi
# UMKM Go Digital

Tanggal audit: 2026-11-09  
Standar referensi: COBIT 2019  
Penanggung jawab audit: IT Governance, Risk & Assurance Review  

---

## 1. Ringkasan Eksekutif

Hasil audit tata kelola teknologi informasi pada sistem UMKM Go Digital menunjukkan bahwa tata kelola TI masih berada pada tahap awal (ad-hoc) dan belum terformalisasi dengan baik. Pengelolaan investasi TI, struktur organisasi, dan manajemen risiko belum memenuhi prinsip-prinsip dasar tata kelola yang efektif berdasarkan framework COBIT 2019.

Secara umum, sistem dikembangkan dengan pendekatan prototype yang menitikberatkan pada berjalannya fungsi aplikasi, namun mengabaikan aspek keberlanjutan biaya, pemisahan tugas, serta kepatuhan pengendalian risiko.

Temuan utama:
- Pengelolaan investasi dan anggaran TI berjalan ad-hoc tanpa perhitungan Total Cost of Ownership (TCO) dan proyeksi biaya cloud
- Belum ada metrik evaluasi manfaat investasi TI (Benefits Realization / Value Delivery)
- Struktur organisasi mengalami ketiadaan pemisahan tugas (Segregation of Duties), seluruh akses dikendalikan peran tunggal (one-man show)
- Ketiadaan IT Steering Committee atau komite pengarah untuk menyelaraskan TI dengan kebutuhan UMKM
- Manajemen risiko TI belum terdokumentasi, tidak memiliki Risk Register formal
- Ketiadaan rencana kelangsungan bisnis dan pemulihan bencana (Disaster Recovery Plan / DRP)
- Celah keamanan kritis pada eksposur service_role key dan autentikasi admin yang berdampak langsung pada risiko operasional dan integritas data

Kesimpulan: Tata kelola TI sistem UMKM Go Digital berada pada Capability Level 1 (Performed) dan memerlukan perbaikan mendesak di bidang tata kelola anggaran, restrukturisasi peran, dan mitigasi risiko agar sistem dapat beroperasi secara stabil dan aman.

---

## 2. Ruang Lingkup Audit

Audit ini mencakup:
- Investasi dan anggaran TI (perencanaan biaya, TCO, lisensi, dan efisiensi cloud)
- Struktur organisasi TI (pembagian peran, akuntabilitas, dan Segregation of Duties)
- Manajemen risiko TI (identifikasi risiko, profil risiko, dan mitigasi operasional)
- Kesesuaian tata kelola terhadap standar COBIT 2019 (Domain EDM, APO, dan DSS)

---

## 3. Metodologi Audit

Metodologi yang digunakan adalah review konfigurasi teknis, pemeriksaan berkas dokumentasi sistem, observasi arsitektur cloud, dan pemetaan proses tata kelola berbasis COBIT 2019. Audit ini menilai:
- perencanaan dan transparansi anggaran operasional TI (CapEx dan OpEx)
- keberadaan mekanisme pembatas biaya dan pemantauan utilisasi cloud
- struktur organisasi, kejelasan tugas, dan Segregation of Duties (SoD)
- proses identifikasi dan mitigasi risiko TI operasional
- kesiapan kelangsungan layanan dan pemulihan bencana (BCP/DRP)
- kepatuhan terhadap objektif tata kelola COBIT 2019: EDM01, EDM02, EDM03, APO01, APO05, APO06, APO07, APO12, dan DSS05

---

## 4. Temuan Utama

### 4.1 Investasi dan anggaran TI berjalan ad-hoc tanpa perhitungan TCO

Bukti implementasi:
- File: .env.local dan arsitektur deployment
- Sistem bertumpu penuh pada skema free-tier pihak ketiga (Vercel dan Supabase)
- Tidak ditemukan dokumen Rencana Anggaran Biaya (RAB) atau perhitungan Total Cost of Ownership (TCO) jangka panjang

Risiko:
- Sistem rentan mengalami penghentian layanan mendadak jika kuota free-tier habis
- Ketiadaan spend-capping atau billing alert berisiko memicu lonjakan tagihan tak terduga jika berpindah ke skema pay-as-you-go
- Ketidakpastian pendanaan untuk pemeliharaan sistem jangka panjang

Temuan:
- High

Implikasi COBIT 2019:
- Domain APO06 (Managed Budget and Costs) belum terpenuhi karena biaya tidak diproyeksikan dan dipantau secara transparan.

Rekomendasi:
- Susun model perhitungan TCO untuk 1-3 tahun ke depan
- Pasang billing alert pada dashboard penyedia cloud di ambang batas 50% dan 80% kuota
- Alokasikan pos anggaran operasional mandiri untuk langganan database dan domain

---

### 4.2 Belum ada pengukuran nilai bisnis dan realisasi manfaat investasi TI

Bukti implementasi:
- File: Manual_Book_UMKM_Go_Digital.md dan kode aplikasi
- Pengembangan fitur dilakukan tanpa pengukuran metrik keterpakaian (analytics) atau evaluasi kepuasan pelaku UMKM

Risiko:
- Waktu dan tenaga pengembangan berisiko dialokasikan pada fitur yang tidak memberikan dampak nyata bagi pengguna
- Sulit mempertanggungjawabkan kelayakan investasi sistem kepada pemangku kepentingan

Temuan:
- Medium

Implikasi COBIT 2019:
- Domain EDM02 (Ensured Benefits Delivery) dan APO05 (Managed Portfolio) tidak terpenuhi karena tidak ada pelaporan berkala mengenai realisasi manfaat bisnis TI.

Rekomendasi:
- Pasang sistem pelacakan analitik penggunaan fitur (misal: frekuensi kalkulasi harga dan artikel yang dibaca)
- Buat tinjauan evaluasi manfaat (post-implementation review) secara berkala

---

### 4.3 Ketiadaan pemisahan tugas (Segregation of Duties) dan ketergantungan peran tunggal

Bukti implementasi:
- Repositori dan berkas konfigurasi sistem
- Seluruh peran (perancangan arsitektur, coding frontend/backend, administrasi database, deployment, hingga penulisan artikel) dikelola oleh satu orang
- Tidak ada mekanisme peer review atau pull request approval

Risiko:
- Extreme single point of failure (bus factor = 1); jika pengembang utama tidak tersedia, seluruh pemeliharaan sistem berhenti
- Potensi manipulasi data produksi atau kesalahan kode langsung ke server live tanpa filter pengawasan

Temuan:
- High

Implikasi COBIT 2019:
- Domain EDM01 (Ensured Governance Framework Setting) dan APO01 (Managed I&T Management Framework) tidak terpenuhi karena tidak ada pembagian wewenang yang jelas.

Rekomendasi:
- Pisahkan peran minimal menjadi: Pengelola Konten, Pengembang Aplikasi, dan Pemilik Sistem (System Owner)
- Wajibkan mekanisme Pull Request (PR) review di GitHub sebelum kode digabungkan ke cabang main
- Terapkan matriks tanggung jawab RACI formal

---

### 4.4 Ketiadaan IT Steering Committee dan kebijakan tata kelola tertulis

Bukti implementasi:
- Tidak ditemukan dokumen IT Charter, Standar Operasional Prosedur (SOP) pengelolaan sistem, maupun komite pengarah TI

Risiko:
- Arah pengembangan aplikasi tidak memiliki landasan regulasi dan tata kelola yang terstandar
- Tidak ada saluran komunikasi formal antara kebutuhan pengguna UMKM dengan roadmap pengembangan teknologi

Temuan:
- Medium

Implikasi COBIT 2019:
- Domain EDM01 dan APO07 (Managed Human Resources) belum memadai dalam memastikan arahan tata kelola yang selaras dengan visi organisasi.

Rekomendasi:
- Bentuk komite pengarah atau forum peninjau berkala yang melibatkan perwakilan pengguna UMKM
- Buat dokumen SOP rilis aplikasi dan SOP pengelolaan data pengguna

---

### 4.5 Ketiadaan dokumen Risk Register dan proses manajemen risiko formal

Bukti implementasi:
- Repositori proyek tidak memuat dokumen daftar risiko (Risk Register), analisis dampak bisnis (BIA), maupun risk appetite organisasi

Risiko:
- Manajemen tidak memiliki visibilitas terhadap ancaman yang dapat menghentikan operasional aplikasi
- Tindakan mitigasi bersifat reaktif saat insiden terjadi, bukan preventif

Temuan:
- High

Implikasi COBIT 2019:
- Domain EDM03 (Ensured Risk Optimization) dan APO12 (Managed Risk) gagal dipenuhi karena profil risiko TI tidak diidentifikasi dan dikelola.

Rekomendasi:
- Susun IT Risk Register yang mengidentifikasi risiko teknologi, operasional, dan kepatuhan beserta mitigasinya
- Lakukan review risiko TI minimal satu kali setiap semester

---

### 4.6 Ketiadaan Disaster Recovery Plan (DRP) dan prosedur backup teruji

Bukti implementasi:
- File: supabase_schema_updated.sql dan konfigurasi hosting
- Tidak ada skrip backup otomatis terjadwal di luar fitur bawaan penyedia cloud
- Tidak ada prosedur pemulihan bencana (Disaster Recovery Plan) dengan metrik RTO dan RPO yang ditetapkan

Risiko:
- Kerusakan database atau kegagalan hosting berisiko menyebabkan kehilangan data permanen
- Waktu henti sistem (downtime) tidak dapat diprediksi saat terjadi insiden fatal

Temuan:
- High

Implikasi COBIT 2019:
- Domain DSS04 (Managed Continuity) tidak terpenuhi karena tidak ada jaminan kelangsungan operasional sistem saat krisis.

Rekomendasi:
- Aktifkan jadwal backup harian otomatis (snapshot) pada database Supabase
- Susun dokumen DRP sederhana dan lakukan simulasi pemulihan data minimal setahun sekali
- Tetapkan target pemulihan: RTO < 4 jam dan RPO < 24 jam

---

### 4.7 Celah keamanan pada kontrol akses dan manajemen kredensial

Bukti implementasi:
- File: .env.local memuat service_role key yang terekspos ke publik
- File: src/app/admin-login-umkm/page.tsx menggunakan pencocokan password plaintext dan session berbasis localStorage

Risiko:
- Data artikel dan konfigurasi sistem dapat dimanipulasi atau dihapus oleh pihak luar
- Integritas dan kerahasiaan data operasional terancam secara langsung

Temuan:
- Critical

Implikasi COBIT 2019:
- Domain DSS05 (Managed Security Services) dan APO12 gagal melindungi aset informasi dari ancaman kebocoran data.

Rekomendasi:
- Cabut (revoke) service_role key dari file publik dan ganti dengan anon key resmi
- Terapkan Row Level Security (RLS) ketat di semua tabel database
- Migrasikan autentikasi admin ke Supabase Auth dengan password hash dan cookie aman

---

## 5. Evaluasi Tingkat Kematangan (Capability Level COBIT 2019)

Berdasarkan skala kapabilitas COBIT 2019 (Level 0 sampai 5):

- EDM01 (Governance Framework Setting): Level 1 (Performed)
- EDM02 (Benefits Delivery): Level 1 (Performed)
- EDM03 (Risk Optimization): Level 0 (Incomplete)
- APO01 (Management Framework): Level 1 (Performed)
- APO05 (Portfolio Management): Level 1 (Performed)
- APO06 (Budget and Costs): Level 1 (Performed)
- APO07 (Human Resources): Level 1 (Performed)
- APO12 (Risk Management): Level 0 (Incomplete)
- DSS04 (Continuity Management): Level 0 (Incomplete)
- DSS05 (Security Services): Level 1 (Performed)

Rata-rata kapabilitas saat ini: Level 1.0 (Performed).  
Target ideal untuk operasional publik: Level 3.0 (Established).

---

## 6. Kesesuaian terhadap COBIT 2019

Secara umum, sistem belum memenuhi prinsip-prinsip utama tata kelola teknologi informasi COBIT 2019, khususnya dalam aspek:

- Penyelarasan strategi dan pengelolaan anggaran (Align, Plan and Organize - APO)
- Pemisahan peran dan akuntabilitas organisasi
- Pengelolaan risiko operasional dan kelangsungan bisnis
- Pengendalian keamanan aset informasi (Deliver, Service and Support - DSS)
- Evaluasi pengantaran nilai bisnis (Evaluate, Direct and Monitor - EDM)

Penilaiannya:
- Status: belum memenuhi standar tata kelola TI formal
- Tingkat risiko tata kelola: tinggi
- Prioritas perbaikan: segera

---

## 7. Rekomendasi Prioritas

### Prioritas 0 (Segera)
1. Cabut service_role key dari file publik .env.local dan ganti dengan anon key
2. Aktifkan dan perketat Row Level Security (RLS) pada seluruh tabel database
3. Hentikan autentikasi plaintext dan localStorage; gunakan Supabase Auth SDK
4. Pasang billing alert dan spend-capping pada dashboard Vercel dan Supabase

### Prioritas 1
1. Bentuk struktur peran terpisah (Admin Konten, Pengembang Kode, System Owner)
2. Susun IT Risk Register yang memetakan ancaman operasional dan rencana mitigasinya
3. Aktifkan backup otomatis harian pada database dan dokumentasikan alur pemulihan data
4. Wajibkan proses Pull Request dan code review sebelum merge ke branch main

### Prioritas 2
1. Susun dokumen Total Cost of Ownership (TCO) dan proyeksi anggaran operasional tahunan
2. Pasang sistem analitik untuk mengukur realisasi manfaat fitur bagi pelaku UMKM
3. Buat dokumen SOP rilis aplikasi dan kebijakan perlindungan data
4. Jadwalkan audit tata kelola berkala setiap 6 bulan untuk mengukur kenaikan capability level

---

## 8. Kesimpulan

Audit tata kelola TI yang dilakukan terhadap UMKM Go Digital menunjukkan bahwa aplikasi telah berhasil berjalan secara fungsional, namun memiliki kelemahan mendasar dalam tata kelola organisasi, pengelolaan anggaran, dan manajemen risiko. Masalah utama terletak pada:
- ketiadaan perencanaan anggaran berkelanjutan dan TCO
- ketergantungan penuh pada peran tunggal (one-man show) tanpa pemisahan tugas
- ketiadaan dokumentasi risiko dan Disaster Recovery Plan
- celah keamanan pada manajemen kredensial dan kontrol akses database

Diperlukan langkah-langkah perbaikan tata kelola secara bertahap dan terstruktur agar platform UMKM Go Digital dapat berkembang secara berkelanjutan, akuntabel, dan aman bagi seluruh penggunanya.

---

## 9. Status Final

Status tata kelola: YELLOW / Memerlukan Tindakan Perbaikan dan Remediasi

Rekomendasi: Lakukan perbaikan mendesak pada Prioritas 0 dan Prioritas 1, lalu lakukan evaluasi berkala untuk memastikan proses tata kelola mencapai Level 3 (Established).
