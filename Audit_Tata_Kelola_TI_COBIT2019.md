# Audit Tata Kelola Teknologi Informasi (COBIT 2019)
# UMKM Go Digital

Tanggal audit: 2026-11-09  
Standar referensi: COBIT 2019 (ISACA)  
Penanggung jawab audit: IT Governance, Risk & Assurance Review  
Status laporan: Final (Re-Audit Komprehensif)  

---

## 1. Ringkasan Eksekutif

Audit tata kelola teknologi informasi (TI) ini dilakukan untuk mengevaluasi efektivitas, keberlanjutan, akuntabilitas, dan manajemen risiko pada platform **UMKM Go Digital**. Audit menggunakan standar kerangka kerja **COBIT 2019** dengan fokus utama pada tiga pilar tata kelola:
1. **Investasi dan Anggaran TI** (*IT Investment and Budgeting*)
2. **Struktur Organisasi dan Sumber Daya Manusia** (*Organizational Structure and Human Resources*)
3. **Manajemen Risiko dan Pengendalian Keberlanjutan** (*IT Risk Management and Business Continuity*)

Berdasarkan evaluasi terhadap konfigurasi kode sumber, skema basis data, arsitektur infrastruktur cloud, dan operasional aplikasi, ditemukan bahwa tata kelola TI sistem masih berada pada tahap awal (*ad-hoc*) dan belum terformalisasi. Karakteristik sistem mencerminkan *minimum viable product* (MVP) di mana fokus pengembang tercurah pada berfungsinya fitur antarmuka, namun belum diimbangi tata kelola biaya jangka panjang, pembagian peran operasional, dan manajemen risiko yang terstruktur.

Temuan utama:
- **Investasi & Anggaran:** Ketergantungan penuh pada skema *free-tier* tanpa perhitungan *Total Cost of Ownership* (TCO), ketiadaan mekanisme *spend-capping/billing alerts*, serta belum adanya metrik pengukuran realisasi manfaat bisnis (*benefits realization*).
- **Struktur Organisasi:** Terjadi fenomena ketergantungan peran tunggal (*one-man show / bus factor = 1*), ketiadaan pemisahan tugas (*Segregation of Duties*), serta absennya komite pengarah TI (*IT Steering Committee*) yang mewakili kepentingan pengguna UMKM.
- **Manajemen Risiko:** Tidak tersedianya *IT Risk Register*, ketiadaan rencana kelangsungan layanan dan pemulihan bencana (*Disaster Recovery Plan / DRP*), serta ditemukannya celah keamanan kritis pada eksposur kredensial berhak istimewa (*service_role key*) dan sistem autentikasi admin yang berdampak langsung pada risiko operasional dan integritas data.

Kesimpulan: Kapabilitas tata kelola TI sistem UMKM Go Digital secara keseluruhan berada pada **Capability Level 1 (Performed)** dengan status **YELLOW / Memerlukan Tindakan Perbaikan dan Remediasi Segera** sebelum sistem dideploy ke lingkungan produksi skala penuh.

---

## 2. Ruang Lingkup Audit

Audit ini berfokus pada evaluasi tata kelola dan manajemen teknologi informasi yang mencakup:
- **Investasi dan Anggaran TI:** Perencanaan biaya modal (CapEx) dan operasional (OpEx), perhitungan TCO 3 tahun, efisiensi konsumsi kuota cloud (Vercel & Supabase), serta analisis nilai investasi TI bagi UMKM.
- **Struktur Organisasi TI:** Alokasi peran dan tanggung jawab, kejelasan kewenangan, pemisahan tugas (*Segregation of Duties*), mekanisme review perubahan kode, dan matriks RACI.
- **Manajemen Risiko TI:** Identifikasi ancaman operasional, kepatuhan terhadap regulasi pelindungan data (UU PDP No. 27/2022), kesiapan tanggap insiden, serta strategi cadangan (*backup*) dan pemulihan (*disaster recovery*).
- **Kesesuaian Framework COBIT 2019:** Khususnya pada domain *Evaluate, Direct and Monitor* (EDM), *Align, Plan and Organize* (APO), serta *Deliver, Service and Support* (DSS).

Sumber evaluasi utama:
- Kode sumber frontend dan backend: `src/app/*`, `src/lib/supabaseClient.ts`, `src/app/api/*`
- Skema database dan konfigurasi: `supabase_schema.sql`, `supabase_schema_updated.sql`, `.env.local`
- Konfigurasi deployment dan repository: `package.json`, `next.config.ts`, repositori Git
- Dokumentasi sistem: `Manual_Book_UMKM_Go_Digital.md`, `README.md`, `SECURITY_AUDIT_ISO27000_2026.md`

---

## 3. Metodologi Audit COBIT 2019

Metodologi audit yang digunakan menggabungkan penelaahan dokumen teknis (*inspection*), pengujian konfigurasi sistem (*technical testing*), dan penelusuran kode (*code walkthrough*) yang dipetakan ke dalam domain tata kelola COBIT 2019:

```
+-------------------------------------------------------------------------------+
|                      PEMETAAN DOMAIN COBIT 2019                               |
+---------------------------------------+---------------------------------------+
| GOVERNANCE (Tata Kelola)              | MANAGEMENT (Manajemen)                |
|                                       |                                       |
| [EDM01] Ensured Governance Framework  | [APO01] Managed I&T Framework         |
| [EDM02] Ensured Benefits Delivery     | [APO05] Managed Portfolio             |
| [EDM03] Ensured Risk Optimization     | [APO06] Managed Budget & Costs        |
|                                       | [APO07] Managed Human Resources       |
|                                       | [APO12] Managed Risk                  |
|                                       | [DSS04] Managed Continuity            |
|                                       | [DSS05] Managed Security Services     |
+---------------------------------------+---------------------------------------+
```

Penilaian tingkat kematangan mengacu pada skala *Process Capability Level* COBIT 2019:
- **Level 0 (Incomplete):** Proses tidak dijalankan atau gagal mencapai tujuan.
- **Level 1 (Performed):** Proses berjalan mencapai tujuannya melalui sekumpulan aktivitas *ad-hoc*.
- **Level 2 (Managed):** Proses direncanakan, dimonitor, dan disesuaikan.
- **Level 3 (Established):** Proses terstandarisasi dan terdokumentasi di tingkat organisasi.
- **Level 4 (Predictable):** Proses diukur dengan metrik kuantitatif dan terkontrol.
- **Level 5 (Optimizing):** Proses terus disempurnakan secara berkelanjutan.

---

## 4. Analisis & Temuan Audit Detail

---

### 4.1 INVESTASI DAN ANGGARAN TI

#### 4.1.1 Ketiadaan Perhitungan Total Cost of Ownership (TCO) dan Perencanaan Biaya Berkelanjutan
* **Bukti Implementasi:**  
  - Berkas `package.json`, `next.config.ts`, dan `.env.local`.
  - Infrastruktur platform bertumpu penuh pada paket gratis (*free-tier*) Supabase PostgreSQL Cloud dan Vercel Serverless Hosting.
  - Tidak ditemukan dokumen Rencana Anggaran Biaya (RAB), estimasi biaya lisensi domain/SSL, maupun kalkulasi *Total Cost of Ownership* (TCO) multi-tahun.
* **Risiko:**  
  - *Service Outage:* Layanan berisiko dihentikan sepihak (*suspended*) oleh penyedia cloud saat kuota gratis (seperti *monthly active users, egress bandwidth*, atau *compute hours*) terlampaui ketika platform ramai digunakan pelaku UMKM.
  - *Financial Shock:* Jika akun dikonfigurasikan otomatis ke skema *pay-as-you-go*, lonjakan traffic tidak terduga dapat menimbulkan tagihan finansial membengkak tanpa kendali.
* **Tingkat Temuan:** High
* **Implikasi COBIT 2019:**  
  - **APO06.01 & APO06.02 (Managed Budget and Costs):** Manajemen gagal menyusun anggaran operasional tahunan dan tidak memiliki kontrol biaya preventif.
* **Rekomendasi:**  
  1. Susun dokumen TCO 3 tahun yang memproyeksikan biaya transisi ke tier berbayar (Supabase Pro Plan ~$25/bln, domain tahunan, dan cadangan API compute).
  2. Aktifkan *Spend Cap* dan *Billing Alert* pada dashboard cloud di ambang batas 50%, 75%, dan 90% dari kuota.

#### 4.1.2 Ketiadaan Pengukuran Nilai Bisnis Investasi TI (*Benefits Realization*)
* **Bukti Implementasi:**  
  - Berkas `src/app/simulasi-harga/page.tsx` dan `src/app/page.tsx`.
  - Modul simulasi harga dan kalkulasi margin telah dibangun, namun tidak memiliki instrumen telemetri bisnis (seperti Google Analytics, Plausible, atau PostHog) untuk mengukur volume penggunaan riil, tingkat retensi, dan kepuasan UMKM.
* **Risiko:**  
  - Alokasi waktu dan biaya pengembangan berisiko sia-sia (*waste of resources*) karena pengembang tidak memiliki data empiris apakah fitur yang dibangun benar-benar menyelesaikan masalah literasi digital UMKM.
* **Tingkat Temuan:** Medium
* **Implikasi COBIT 2019:**  
  - **EDM02.01 & EDM02.02 (Ensured Benefits Delivery) dan APO05.03 (Managed Portfolio):** Tidak ada evaluasi periodik atas realisasi manfaat ekonomi dan operasional dari investasi TI yang ditanamkan.
* **Rekomendasi:**  
  1. Integrasikan analitik penggunaan fitur yang aman dan mematuhi privasi guna melacak metrik adopsi fitur simulasi harga.
  2. Lakukan evaluasi pasca-implementasi (*post-implementation review*) setiap semester bersama komunitas UMKM pengguna.

---

### 4.2 STRUKTUR ORGANISASI TI

#### 4.2.1 Ketiadaan Pemisahan Tugas (*Segregation of Duties*) & Ketergantungan Ekstrem Peran Tunggal
* **Bukti Implementasi:**  
  - Repositori Git (`0061Febriana/umkm-go-digital`) dan file `src/app/admin-login-umkm/page.tsx`.
  - Seluruh siklus hidup sistem—perancangan arsitektur, penulisan kode sumber, administrasi database produksi, deployment, dan penulisan konten edukasi—dijalankan oleh satu individu pengembang.
  - Tidak ada proses peninjauan independen (*peer-review*) atau *Pull Request (PR) approval rule* sebelum perubahan digabungkan ke cabang utama (`main`).
* **Risiko:**  
  - *Extreme Single Point of Failure (Bus Factor = 1):* Apabila pengembang utama berhalangan tetap atau keluar, pemeliharaan sistem terhenti total karena tidak ada transfer pengetahuan terdokumentasi.
  - *Conflict of Interest & Fraud:* Satu pengguna memiliki akses mutlak untuk mengubah kode program dan memanipulasi data produksi secara langsung tanpa *audit trail*.
* **Tingkat Temuan:** High
* **Implikasi COBIT 2019:**  
  - **EDM01.01 (Governance Framework Setting) & APO01.03 (Maintain Enablers):** Struktur organisasi tidak memiliki pemisahan fungsi (*Segregation of Duties*) antara fungsi pengembang, fungsi operasional database, dan fungsi pembuat konten.
* **Rekomendasi:**  
  1. Bentuk struktur organisasi minimal dengan memisahkan 3 fungsi: **Admin Konten**, **Lead Developer**, dan **System/Security Owner**.
  2. Terapkan aturan *Branch Protection* di GitHub: larang direct commit ke branch `main` dan wajibkan minimal 1 approval sebelum merge.

#### 4.2.2 Ketiadaan IT Steering Committee dan Kebijakan Tata Kelola Tertulis
* **Bukti Implementasi:**  
  - Berkas dokumentasi `Manual_Book_UMKM_Go_Digital.md`.
  - Dokumentasi hanya bersifat petunjuk teknis operasional bagi pengguna akhir, tanpa adanya *IT Charter*, *Information Security Policy*, atau wadah pengarah tata kelola TI (*IT Steering Committee*).
* **Risiko:**  
  - Keputusan pengembangan sistem berjalan secara subjektif tanpa keselarasan strategis dengan pembina UMKM atau regulator terkait.
* **Tingkat Temuan:** Medium
* **Implikasi COBIT 2019:**  
  - **EDM01.02 & APO07.03 (Managed Human Resources):** Tidak ada komite pengarah yang mengawasi kepatuhan tata kelola dan menetapkan arah kebijakan teknologi.
* **Rekomendasi:**  
  1. Bentuk komite pengarah berkala yang melibatkan perwakilan akademisi/lembaga pembina UMKM dan tim pengembang.
  2. Susun dokumen SOP Tata Kelola TI: Prosedur Rilis Aplikasi, Kebijakan Akses Administratif, dan Kebijakan Hak Cipta Konten Edukasi.

---

### 4.3 MANAJEMEN RISIKO TI & KEBERLANJUTAN LAYANAN

#### 4.3.1 Celah Kritis pada Manajemen Kredensial dan Kontrol Akses Database
* **Bukti Implementasi:**  
  - Berkas `.env.local`: Variabel `NEXT_PUBLIC_SUPABASE_ANON_KEY` memuat token JWT dengan payload `"role": "service_role"`.
  - Berkas `supabase_schema_updated.sql`: Seluruh tabel diberi kebijakan RLS terbuka `FOR ALL USING (true) WITH CHECK (true)`.
  - Berkas `src/app/admin-login-umkm/page.tsx`: Autentikasi membandingkan kata sandi teks polos (*plaintext*) dan status login disimpan pada `localStorage.setItem("umkm_admin_logged", "true")`.
* **Risiko:**  
  - Kunci *service_role* terdistribusi ke browser pengunjung publik, memungkinkan siapa saja menghapus atau memodifikasi seluruh tabel basis data tanpa otorisasi.
  - Sesi admin di `localStorage` dapat dibobol seketika tanpa perlu mengetahui kata sandi asli.
* **Tingkat Temuan:** Critical
* **Implikasi COBIT 2019:**  
  - **DSS05.02 & DSS05.04 (Managed Security Services) dan APO12.02 (Managed Risk):** Kegagalan mendasar dalam mengendalikan hak akses istimewa (*privileged access*) dan perlindungan aset data organisasi.
* **Rekomendasi:**  
  1. **Segera revoke dan regenerate** service_role key di Supabase, dan pastikan variabel publik peramban hanya memuat anon public key.
  2. Terapkan RLS ketat: operasi *READ* untuk publik, operasi *WRITE/UPDATE/DELETE* hanya untuk akun admin terverifikasi.
  3. Migrasikan sistem login admin ke Supabase Auth SDK berbasis password hash dan cookie HttpOnly aman.

#### 4.3.2 Ketiadaan Dokumen Risk Register dan Rencana Tanggap Risiko Formal
* **Bukti Implementasi:**  
  - Repositori proyek tidak memiliki dokumen *IT Risk Register*, matriks penilaian probabilitas-dampak (*likelihood vs impact*), maupun *risk appetite statement*.
* **Risiko:**  
  - Manajemen bersifat reaktif terhadap gangguan operasional (seperti eror query database, scraper harga marketplace mati, atau serangan web) yang dapat melumpuhkan layanan publik.
* **Tingkat Temuan:** High
* **Implikasi COBIT 2019:**  
  - **EDM03.01 (Risk Optimization) & APO12.01 (Managed Risk):** Organisasi tidak memiliki visibilitas atas profil risiko TI dan tidak menetapkan batas toleransi risiko.
* **Rekomendasi:**  
  1. Susun dokumen formal *IT Risk Register* yang mencatat kategori risiko, pemilik risiko (*risk owner*), mitigasi preventif, dan rencana kontinjensi.
  2. Lakukan evaluasi risiko berkala setiap 6 bulan sekali.

#### 4.3.3 Ketiadaan Disaster Recovery Plan (DRP) dan Jadwal Backup Teruji
* **Bukti Implementasi:**  
  - File `supabase_schema_updated.sql` dan konfigurasi hosting.
  - Tidak ada mekanisme pencadangan otomatis di luar lingkungan cloud primer (*off-site backup*).
  - Tidak ada dokumen DRP dengan metrik *Recovery Time Objective* (RTO) dan *Recovery Point Objective* (RPO) yang disepakati.
* **Risiko:**  
  - Jika terjadi kegagalan hosting atau penghapusan skema database, seluruh data edukasi dan analitik harga terancam hilang permanen dengan waktu henti (*downtime*) tak terprediksi.
* **Tingkat Temuan:** High
* **Implikasi COBIT 2019:**  
  - **DSS04.01 & DSS04.03 (Managed Continuity):** Manajemen tidak memiliki rencana keberlanjutan layanan yang menjamin ketersediaan sistem saat terjadi bencana teknis.
* **Rekomendasi:**  
  1. Aktifkan pencadangan harian otomatis (*automated daily snapshot*) pada basis data Supabase dan simpan salinan eksternal berkala.
  2. Tetapkan target pemulihan darurat: RTO < 4 jam dan RPO < 24 jam, serta lakukan simulasi *restore drill* minimal satu kali setahun.

---

## 5. Evaluasi Tingkat Kematangan (Capability Level COBIT 2019)

Berdasarkan hasil pengujian mendalam, berikut adalah skor tingkat kematangan kapabilitas (*Capability Level*) saat ini (*As-Is*) dibandingkan dengan target tata kelola minimum (*To-Be*):

| Domain Objektif COBIT 2019 | Nama Proses Tata Kelola / Manajemen | As-Is (0 - 5) | To-Be Target | Kesenjangan (Gap) | Keterangan Evaluasi Lapangan |
|:---|:---|:---:|:---:|:---:|:---|
| **EDM01** | *Governance Framework Setting* | **1.2** | **3.0** | -1.8 | Tata kelola berjalan ad-hoc, tanpa komite pengarah |
| **EDM02** | *Benefits Delivery* | **1.0** | **2.5** | -1.5 | Belum ada metrik bisnis evaluasi manfaat investasi |
| **EDM03** | *Risk Optimization* | **0.8** | **3.0** | -2.2 | **Kritis**, belum ada batas toleransi risiko formal |
| **APO01** | *Management Framework* | **1.0** | **3.0** | -2.0 | Struktur organisasi tersentral tunggal (one-man show) |
| **APO05** | *Portfolio Management* | **1.0** | **2.5** | -1.5 | Pengembangan fitur belum melalui evaluasi prioritas |
| **APO06** | *Budget and Costs* | **1.2** | **3.0** | -1.8 | Ketergantungan free-tier tanpa kalkulasi TCO |
| **APO07** | *Human Resources* | **1.0** | **2.5** | -1.5 | Ketiadaan pemisahan tugas (Segregation of Duties) |
| **APO12** | *Risk Management* | **0.8** | **3.0** | -2.2 | **Kritis**, ketiadaan IT Risk Register |
| **DSS04** | *Continuity Management* | **0.8** | **3.0** | -2.2 | Ketiadaan DRP dan target RTO/RPO pemulihan data |
| **DSS05** | *Security Services* | **1.0** | **3.0** | -2.0 | **Kritis**, kebocoran service_role key & auth rentan |

**Rata-rata Kapabilitas Tata Kelola: Level 1.0 (Performed).**  
Sistem saat ini baru berada pada tahap menjalankan fungsionalitas dasar secara reaktif, belum terstandar, dan belum terkelola secara berkelanjutan.

---

## 6. Keselarasan terhadap Prinsip Tata Kelola COBIT 2019

Sistem UMKM Go Digital dievaluasi terhadap 6 Prinsip Tata Kelola COBIT 2019 (*Governance System Principles*):
1. **Provide Stakeholder Value:** *Sebagian terpenuhi.* Fitur kalkulasi harga dan artikel edukasi memberikan nilai fungsional, namun belum didukung metrik manfaat terukur.
2. **Holistic Approach:** *Belum terpenuhi.* Fokus pengembangan hanya pada aspek *Process/Code*, mengabaikan komponen tata kelola lainnya seperti *Organizational Structures, Information/Security Policies, dan Culture*.
3. **Dynamic Governance System:** *Belum terpenuhi.* Sistem belum responsif terhadap perubahan regulasi dan ancaman siber.
4. **Governance Distinct from Management:** *Belum terpenuhi.* Tidak ada pemisahan wewenang antara pengarah (governance) dan pelaksana teknis (management).
5. **Tailored to Enterprise Needs:** *Sebagian terpenuhi.* Skala sistem disesuaikan untuk UMKM, namun model biaya dan arsitektur belum dioptimalkan untuk jangka panjang.
6. **End-to-End Governance System:** *Belum terpenuhi.* Pengelolaan data dan keamanan belum mencakup seluruh alur sistem dari input hingga penyimpanan.

---

## 7. Matriks RACI Tata Kelola Organisasi Rekomendasi

Untuk menyelesaikan permasalahan *One-Man Show* dan ketiadaan pemisahan tugas, auditor merancang matriks penugasan akuntabilitas RACI (*Responsible, Accountable, Consulted, Informed*) sebagai berikut:

| Aktivitas Tata Kelola TI | Pemilik Sistem / Dosen Pembimbing | Lead Software Engineer | Database & Cloud Administrator | Kontributor Konten UMKM | Auditor / Security Reviewer |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Penyusunan TCO & Anggaran Operasional TI** | **A / R** | C | C | I | I |
| **Persetujuan Rilis Fitur Baru ke Produksi** | **A** | R | C | I | C |
| **Manajemen Hak Akses & Rotasi Kunci API** | I | C | **A / R** | - | C |
| **Publikasi Artikel Strategi & Kebijakan** | I | - | - | **A / R** | - |
| **Pemeliharaan & Pengujian Backup Data (DRP)** | I | C | **A / R** | - | C |
| **Pembaruan Dokumen IT Risk Register** | **A** | C | C | I | **R** |

*Keterangan: **R** (Responsible/Pelaksana), **A** (Accountable/Penanggung Jawab Utama), **C** (Consulted/Pihak Berkonsultasi), **I** (Informed/Pihak Penerima Laporan).*

---

## 8. Profil Risiko & IT Risk Register

Berikut adalah ringkasan inventarisasi risiko teknologi informasi utama yang berhasil diidentifikasi:

| Kode Risiko | Deskripsi Risiko | Kategori | Likelihood | Impact | Tingkat Risiko | Rencana Mitigasi Auditor | Pemilik Risiko |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---:|
| **RSK-01** | Kebocoran hak akses penuh database via `service_role` key | Keamanan | High | Critical | **EXTREME** | Revoke key segera, pasang RLS ketat, ganti ke anon key | Cloud Admin |
| **RSK-02** | Penghentian layanan akibat kuota *free-tier* habis | Finansial/Ops | High | High | **HIGH** | Pasang billing alerts 50%/80%, siapkan pos dana Pro plan | Lead Developer |
| **RSK-03** | Pembajakan dashboard admin akibat auth plaintext & localStorage | Keamanan | High | Critical | **EXTREME** | Migrasi ke Supabase Auth SDK dengan HttpOnly cookie | Lead Developer |
| **RSK-04** | Kehilangan data permanen akibat kegagalan database tanpa DRP | Operasional | Medium | High | **HIGH** | Aktifkan daily snapshot otomatis, uji coba pemulihan data | Cloud Admin |
| **RSK-05** | Kelumpuhan pemeliharaan sistem akibat *Bus Factor = 1* | Organisasi | High | High | **HIGH** | Bagi peran kerja, terapkan PR review, dokumentasikan arsitektur | System Owner |
| **RSK-06** | Ketidaksesuaian fitur dengan kebutuhan riil pelaku UMKM | Strategis | Medium | Medium | **MEDIUM** | Pasang analitik penggunaan fitur, adakan review semesteran | Content Admin |

---

## 9. Rekomendasi Prioritas & Action Plan

Auditor menyusun rencana tindak lanjut terstruktur berdasarkan tingkat kedaruratan:

### Prioritas 0: Perbaikan Kritis & Mendesak (Minggu 1 – Minggu 2)
1. **Remediasi Kredensial Database:** Cabut (*revoke*) `service_role` key dari berkas `.env.local` dan ganti dengan *anonymous key* yang aman.
2. **Penguncian Akses Data (RLS):** Perbaiki kebijakan RLS pada database Supabase agar publik hanya memiliki hak baca (*SELECT*), sedangkan operasi tulis (*INSERT/UPDATE/DELETE*) wajib melalui autentikasi admin.
3. **Pemberhentian Plaintext Password:** Hentikan penyimpanan dan pencocokan kata sandi teks polos pada modul `src/app/admin-login-umkm/page.tsx` dan hapus penyimpanan status login di `localStorage`.
4. **Proteksi Anggaran Cloud:** Pasang notifikasi *spend-capping* dan *billing alerts* pada konsol Vercel dan Supabase.

### Prioritas 1: Penataan Tata Kelola & Organisasi (Bulan 1 – Bulan 2)
1. **Implementasi Pemisahan Tugas (SoD):** Terapkan matriks RACI, buat akun admin terpisah khusus penulisan konten tanpa akses ke basis data atau server.
2. **Formalisasi IT Risk Register:** Dokumentasikan daftar risiko operasional dan tetapkan prosedur eskalasi insiden.
3. **Penerapan Rencana Kontinuitas (DRP):** Jadwalkan pencadangan basis data harian otomatis dan tetapkan target pemulihan data (RTO < 4 jam, RPO < 24 jam).
4. **Review Kode Standar (CI/CD Quality Gate):** Terapkan aturan *branch protection* di GitHub untuk memastikan setiap perubahan kode diuji coba sebelum dilepas ke produksi.

### Prioritas 2: Keberlanjutan Strategis Jangka Panjang (Bulan 3 – Bulan 6)
1. **Formulasi Dokumen TCO 3 Tahun:** Susun rencana pembiayaan operasional komprehensif mencakup lisensi cloud, domain, dan pemeliharaan berkala.
2. **Pengukuran Realisasi Manfaat (Benefits Realization):** Pasang analitik terdesentralisasi untuk mengukur keterpakaian fitur kalkulator margin harga secara periodik.
3. **Pembentukan Komite Pengarah TI:** Bentuk forum peninjau rutin bersama asosiasi/pelaku UMKM untuk menyelaraskan roadmap sistem dengan kebutuhan lapangan.
4. **Re-Audit Tata Kelola Berkala:** Lakukan audit COBIT 2019 ulang setiap 6 bulan untuk mengukur kenaikan *capability level* menuju target Level 3 (*Established*).

---

## 10. Kesimpulan & Status Final

Audit komprehensif berbasis framework COBIT 2019 terhadap platform UMKM Go Digital menegaskan bahwa sistem ini memiliki nilai fungsional yang menjanjikan dalam mendukung digitalisasi UMKM. Namun, fondasi tata kelola pada aspek investasi anggaran, struktur organisasi, dan manajemen risiko masih sangat rapuh.

Kegagalan menyelesaikan temuan kritis—khususnya pada eksposur kredensial database, ketiadaan TCO, dan dominasi peran tunggal—akan menempatkan sistem pada risiko operasional dan keamanan yang tinggi. Implementasi rekomendasi Prioritas 0 dan Prioritas 1 merupakan syarat mutlak agar sistem dapat beroperasi secara stabil, akuntabel, dan aman bagi seluruh pelaku UMKM di Indonesia.

---

### Status Final Tata Kelola:
**STATUS: YELLOW / MEMERLUKAN TINDAKAN PERBAIKAN DAN REMEDIASI SEGERA**

*Rekomendasi Tindak Lanjut: Lakukan remediasi teknis darurat sesuai Prioritas 0, lakukan restrukturisasi pembagian tugas operasional, dan jadwalkan re-audit berkala setelah perbaikan diimplementasikan.*
