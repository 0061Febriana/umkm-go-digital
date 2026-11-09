# LAPORAN AUDIT TATA KELOLA TEKNOLOGI INFORMASI
## Evaluasi Berbasis Framework COBIT 2019
### Studi Kasus: Platform Platform Literasi Digital "UMKM Go Digital"

---

| Dokumen | Keterangan |
|:---|:---|
| **Judul Dokumen** | Laporan Audit Tata Kelola Teknologi Informasi (IT Governance Audit) |
| **Objek Audit** | Sistem Informasi & Platform Edukasi UMKM Go Digital |
| **Standar Acuan** | COBIT 2019 (ISACA) Framework |
| **Fokus Area** | 1. Investasi & Anggaran TI<br>2. Struktur Organisasi TI<br>3. Manajemen Risiko TI & Keamanan |
| **Versi Dokumen** | 1.0 (Final Audit Report) |
| **Status** | Diserahkan (*Submitted*) |
| **Tanggal Terbit** | November 2026 |

---

## DAFTAR ISI

1. [BAB I PENDAHULUAN](#bab-i-pendahuluan)
   - 1.1 Latar Belakang Audit
   - 1.2 Tujuan dan Sasaran Audit
   - 1.3 Ruang Lingkup Audit
   - 1.4 Profil Objek dan Arsitektur Sistem
2. [BAB II KERANGKA KERJA & METODOLOGI AUDIT (COBIT 2019)](#bab-ii-kerangka-kerja--metodologi-audit-cobit-2019)
   - 2.1 Pemetaan Domain Tata Kelola & Manajemen COBIT 2019
   - 2.2 Tingkat Kematangan Proses (*Process Capability Levels*)
   - 2.3 Prosedur dan Teknik Pengumpulan Bukti
3. [BAB III TEMUAN AUDIT KRITIS & ANALISIS AKAR MASALAH](#bab-iii-temuan-audit-kritis--analisis-akar-masalah)
   - 3.1 Area 1: Investasi dan Anggaran TI (*APO06, APO05, EDM02*)
   - 3.2 Area 2: Struktur Organisasi & Pembagian Peran (*EDM01, APO01, APO07*)
   - 3.3 Area 3: Manajemen Risiko TI & Pengendalian Sistem (*EDM03, APO12, DSS05*)
4. [BAB IV MATRIKS EVALUASI TINGKAT KEMATANGAN (GAP ANALYSIS)](#bab-iv-matriks-evaluasi-tingkat-kematangan-gap-analysis)
   - 4.1 Tabel Penilaian Kapabilitas (*As-Is vs To-Be*)
   - 4.2 Analisis Kesenjangan (*Gap Analysis*)
5. [BAB V REKOMENDASI STRATEGIS & ROADMAP TATA KELOLA](#bab-v-rekomendasi-strategis--roadmap-tata-kelola)
   - 5.1 Matriks RACI Rekomendasi
   - 5.2 Rencana Aksi Remediasi (Horizon Waktu)
   - 5.3 Opini dan Kesimpulan Akhir Auditor

---

## BAB I PENDAHULUAN

### 1.1 Latar Belakang Audit
Pertumbuhan ekonomi digital di Indonesia menuntut tersedianya platform edukasi dan perkakas penunjang operasional bagi pelaku Usaha Mikro, Kecil, dan Menengah (UMKM). Platform **UMKM Go Digital** dikembangkan untuk menjawab kebutuhan tersebut melalui modul edukasi strategi pemasaran digital, informasi berkala kebijakan lokapasar (*marketplace*), simulasi optimasi kalkulasi margin harga produk, serta generator caption promosi berbasis kecerdasan buatan.

Seiring meningkatnya fungsi dan ketergantungan operasional terhadap platform ini, diperlukan kepastian bahwa aset teknologi informasi dikelola secara akuntabel, efisien, aman, dan selaras dengan tujuan strategis. Tata kelola TI yang lemah berpotensi menimbulkan kerugian finansial akibat inefisiensi anggaran, hilangnya kendali operasional karena ketiadaan struktur peran yang jelas, hingga kebocoran data akibat manajemen risiko yang tidak memadai. Oleh karena itu, audit tata kelola TI independen berbasis kerangka kerja internasional **COBIT 2019** dilaksanakan secara menyeluruh.

### 1.2 Tujuan dan Sasaran Audit
Tujuan pelaksanaan audit ini adalah:
1. Mengevaluasi tata kelola investasi dan perencanaan anggaran TI guna menjamin pengeluaran biaya memberikan nilai bisnis (*value delivery*) yang optimal dan berkelanjutan.
2. Menilai kecukupan struktur organisasi TI, pemisahan fungsi dan wewenang (*Segregation of Duties*), serta kejelasan akuntabilitas pengelolaan sistem.
3. Mengidentifikasi, mengukur, dan mengevaluasi profil risiko teknologi informasi yang dihadapi sistem, mencakup risiko operasional, kepatuhan, dan kerentanan keamanan siber.
4. Memberikan rekomendasi perbaikan berbasis standar industri (*best practices*) yang tertuang dalam *governance roadmap*.

### 1.3 Ruang Lingkup Audit
Ruang lingkup audit dibatasi pada 3 (tiga) pilar inti tata kelola TI platform UMKM Go Digital:
1. **Pengelolaan Investasi dan Anggaran TI** (*IT Investment and Cost Management*).
2. **Struktur Organisasi dan Sumber Daya Manusia TI** (*Organizational Structure and Human Resources*).
3. **Manajemen Risiko dan Pengendalian Keamanan TI** (*IT Risk Management and Security Controls*).

### 1.4 Profil Objek dan Arsitektur Sistem
- **Aplikasi Frontend/Backend:** Next.js 16 (App Router, Turbopack, React 19).
- **Layanan Basis Data & Backend-as-a-Service:** Supabase PostgreSQL Cloud.
- **Infrastruktur Hosting:** Vercel Cloud Platform.
- **Model Akses:** *Open access* untuk publik (pelaku UMKM) dan *restricted access* untuk modul admin (`/admin-dashboard`).

---

## BAB II KERANGKA KERJA & METODOLOGI AUDIT (COBIT 2019)

### 2.1 Pemetaan Domain Tata Kelola & Manajemen COBIT 2019
Framework COBIT 2019 memisahkan antara **Governance (Tata Kelola)** dan **Management (Manajemen)**. Dalam penugasan audit ini, sembilan *Governance/Management Objectives* yang relevan dipetakan sebagai berikut:

```
+-------------------------------------------------------------------------+
|                      COBIT 2019 AUDIT MAPPING                           |
+------------------------------------+------------------------------------+
| GOVERNANCE DOMAIN (EDM)            | MANAGEMENT DOMAIN (APO & DSS)      |
|                                    |                                    |
| [EDM01] Ensured Governance         | [APO01] Managed I&T Framework      |
|         Framework Setting          | [APO05] Managed Portfolio          |
| [EDM02] Ensured Benefits Delivery  | [APO06] Managed Budget & Costs     |
| [EDM03] Ensured Risk Optimization  | [APO07] Managed Human Resources    |
|                                    | [APO12] Managed Risk               |
|                                    | [DSS05] Managed Security Services  |
+------------------------------------+------------------------------------+
```

1. **Investasi & Anggaran TI:**
   - `EDM02` (*Ensured Benefits Delivery*): Memastikan investasi TI menghasilkan nilai bisnis nyata bagi ekosistem UMKM.
   - `APO05` (*Managed Portfolio*): Mengelola portofolio proyek dan inisiatif sistem secara selaras.
   - `APO06` (*Managed Budget and Costs*): Mengelola anggaran biaya operasional (CapEx/OpEx) dan transparansi alokasi dana.
2. **Struktur Organisasi TI:**
   - `EDM01` (*Ensured Governance Framework Setting and Maintenance*): Menetapkan struktur pengarah tata kelola TI.
   - `APO01` (*Managed I&T Management Framework*): Merancang struktur pelaporan, koordinasi tim, dan standar tata kerja.
   - `APO07` (*Managed Human Resources*): Mengatur kompetensi, deskripsi kerja, dan kecukupan SDM pengelola.
3. **Manajemen Risiko TI:**
   - `EDM03` (*Ensured Risk Optimization*): Menetapkan toleransi risiko (*risk appetite*) organisasi terhadap ketergantungan TI.
   - `APO12` (*Managed Risk*): Mengidentifikasi, menganalisis, dan memitigasi risiko bisnis terkait teknologi informasi.
   - `DSS05` (*Managed Security Services*): Melindungi aset informasi dan sistem dari ancaman serta akses tidak berwenang.

### 2.2 Tingkat Kematangan Proses (*Process Capability Levels*)
Penilaian kapabilitas proses mengacu pada model penilaian COBIT 2019 yang berbasis standar ISO/IEC 33004:
- **Level 0 (Incomplete):** Proses tidak dijalankan atau gagal mencapai tujuannya.
- **Level 1 (Performed):** Proses telah berjalan melalui sekumpulan aktivitas, namun belum terorganisasi secara formal.
- **Level 2 (Managed):** Proses telah direncanakan, dimonitor, disesuaikan, dan hasilnya terpelihara.
- **Level 3 (Established):** Proses telah terdefinisi secara baku (*standardized procedure*) di tingkat organisasi.
- **Level 4 (Predictable):** Proses diukur menggunakan parameter kuantitatif dan terkontrol secara statistik.
- **Level 5 (Optimizing):** Proses terus-menerus disempurnakan (*continuous improvement*) secara inovatif.

### 2.3 Prosedur dan Teknik Pengumpulan Bukti
Auditor menggunakan triangulasi metode untuk memverifikasi kondisi faktual:
1. **Inspection of Documentation:** Memeriksa berkas `Manual_Book_UMKM_Go_Digital.md`, `README.md`, skema SQL, dan repositori kode.
2. **Technical Configuration Review:** Mengaudit variabel lingkungan (`.env.local`), skema autentikasi, serta hak akses database Supabase.
3. **Direct Inquiry & Source Code Tracing:** Menganalisis alur data, penanganan eror, dan logika otorisasi pada modul Next.js App Router.

---

## BAB III TEMUAN AUDIT KRITIS & ANALISIS AKAR MASALAH

Setiap temuan disusun menggunakan struktur audit formal: **Kondisi (Condition)**, **Kriteria COBIT (Criteria)**, **Akar Masalah (Cause)**, **Dampak/Risiko (Risk Impact)**, dan **Rekomendasi Tindakan (Recommendation)**.

---

### 3.1 AREA 1: INVESTASI DAN ANGGARAN TI

#### Temuan 1: Ketiadaan Perhitungan TCO dan Rencana Keberlanjutan Finansial (APO06.01, APO06.02)
* **Kondisi (Condition):**  
  Pengembangan dan pengoperasian sistem saat ini sepenuhnya mengandalkan skema *free-tier* dari pihak ketiga (Supabase, Vercel, unmetered public API). Manajemen tidak memiliki dokumen estimasi *Total Cost of Ownership* (TCO) maupun proyeksi pembiayaan ketika kuota komputasi dan database melampaui batas gratis. Tidak ada mekanisme *budget alert* atau *spend-capping* pada akun infrastruktur cloud.
* **Kriteria (Criteria - COBIT 2019 APO06.02 & APO06.03):**  
  Manajemen harus mengidentifikasi seluruh komponen biaya langsung dan tidak langsung, menyusun anggaran operasional tahunan, dan menetapkan kontrol preventif guna mencegah pembengkakan biaya tak terduga (*unexpected overrun*).
* **Akar Masalah (Cause):**  
  Platform diperlakukan sebagai proyek rintisan jangka pendek (*ad-hoc prototype*), sehingga aspek perencanaan finansial formal diabaikan.
* **Dampak Risiko (Risk Impact - Severity: MEDIUM):**  
  - Terhentinya operasional sistem secara mendadak (*abrupt service suspension*) apabila batas gratis terlampaui saat traffic pengguna UMKM melonjak.
  - Risiko lonjakan tagihan tak terkontrol (*financial shock*) jika sistem berpindah ke skema otomatis *pay-as-you-go*.
* **Rekomendasi Auditor:**  
  1. Susun dokumen **TCO Model 3 Tahun** yang mencakup komponen: langganan database cloud, lisensi AI token API, domain & SSL, biaya *backup storage*, dan anggaran perawatan tahunan.
  2. Pasang konfigurasi *Spend Cap* dan *Billing Notification Alerts* pada dashboard Supabase dan Vercel pada ambang batas 50%, 75%, dan 90% dari batas kuota.

#### Temuan 2: Ketiadaan Metrik Pengukuran Nilai Bisnis Investasi TI (EDM02.01, APO05.03)
* **Kondisi (Condition):**  
  Tidak ada *Key Performance Indicators* (KPI) atau metrik kuantitatif yang mengukur efektivitas sistem terhadap kemajuan bisnis UMKM (misal: jumlah transaksi yang terbantu, penghematan waktu penjual, atau tingkat adopsi fitur kalkulator margin harga).
* **Kriteria (Criteria - COBIT 2019 EDM02.02):**  
  Tata kelola investasi TI wajib memantau realisasi manfaat (*benefits realization*) secara periodik untuk memastikan dana dan tenaga yang dikeluarkan berbanding lurus dengan nilai strategis yang dicapai.
* **Akar Masalah (Cause):**  
  Ketiadaan fungsi evaluasi bisnis pasca-implementasi (*post-implementation review*).
* **Dampak Risiko (Risk Impact - Severity: LOW):**  
  Inisiatif pengembangan fitur baru berisiko salah sasaran dan tidak menjawab kebutuhan riil pelaku UMKM di lapangan.
* **Rekomendasi Auditor:**  
  Integrasikan telemetri analitik anonim (misal: Google Analytics atau PostHog) untuk mengukur rasio keterpakaian fitur kalkulator dan artikel panduan, lalu jadikan bahan evaluasi per kuartal.

---

### 3.2 AREA 2: STRUKTUR ORGANISASI & TATA KELOLA SDM

#### Temuan 3: Ketiadaan Pemisahan Tugas (*Lack of Segregation of Duties*) & Ketergantungan Individu Tunggal (EDM01.01, APO01.03, APO07.03)
* **Kondisi (Condition):**  
  Seluruh siklus hidup sistem—perancangan arsitektur, penulisan kode sumber, administrasi skema database produksi, deployment, hingga penulisan konten edukasi—dijalankan oleh satu individu/pengembang. Tidak ada pembagian peran yang formal dan tidak ada fungsi pengawasan independen.
* **Kriteria (Criteria - COBIT 2019 APO01.03 & Organizational Structures Component):**  
  Organisasi harus menetapkan struktur organisasi TI yang memisahkan fungsi pengembangan (*development*), operasional/infrastruktur (*operations*), keamanan (*security*), dan tata usaha/bisnis guna menjamin *checks and balances* serta mencegah manipulasi data.
* **Akar Masalah (Cause):**  
  Keterbatasan kuantitas sumber daya manusia yang terlibat dalam inisiatif platform.
* **Dampak Risiko (Risk Impact - Severity: HIGH):**  
  - *Extreme Single Point of Failure (Bus Factor = 1)*: Jika pengembang utama tidak tersedia, seluruh pemeliharaan dan perbaikan sistem lumpuh total.
  - Risiko kesalahan kode atau modifikasi basis data langsung di produksi tanpa melalui proses *peer-review* atau otorisasi bertingkat.
* **Rekomendasi Auditor:**  
  1. Bentuk struktur tim minimal yang memisahkan peran:
     - **Product & Content Owner:** Mengelola kurasi artikel edukasi dan kebijakan marketplace.
     - **Lead Software Engineer:** Bertanggung jawab atas integritas kode dan pipeline deployment.
     - **Database & Security Custodian:** Bertanggung jawab atas hak akses data dan kredensial server.
  2. Terapkan mekanisme *Pull Request (PR) Approval* di GitHub dengan kewajiban minimal 1 *review* sebelum kode digabungkan ke cabang `main`.

#### Temuan 4: Ketiadaan Kebijakan Tata Kelola Tertulis dan Komite Pengarah TI (EDM01.02)
* **Kondisi (Condition):**  
  Tidak ditemukan adanya dokumen *IT Charter*, *Security Policy*, maupun wadah formal pengarah kebijakan TI (*IT Steering Committee*) yang menjembatani pengembang teknis dengan pemangku kepentingan (*stakeholders*).
* **Kriteria (Criteria - COBIT 2019 EDM01.01):**  
  Dewan pengarah atau manajemen puncak harus menyediakan arahan tertulis mengenai prinsip tata kelola TI dan membentuk komite pengarah yang mengawasi keselarasan proyek TI dengan regulasi dan visi organisasi.
* **Akar Masalah (Cause):**  
  Pengembangan berorientasi teknis kilat (*code-first*) tanpa diimbangi formalisasi tata kelola administrasi (*governance documentation*).
* **Dampak Risiko (Risk Impact - Severity: MEDIUM):**  
  Tidak ada standar baku ketika terjadi pergantian personel dan tidak ada kepastian hukum/kebijakan perlindungan data pengguna.
* **Rekomendasi Auditor:**  
  Susun dokumen kebijakan dasar: Standar Operasional Prosedur (SOP) Rilis Aplikasi, SOP Pengelolaan Akun Administrator, dan Kebijakan Privasi Pengguna.

---

### 3.3 AREA 3: MANAJEMEN RISIKO TI & PENGENDALIAN SISTEM

#### Temuan 5: [TEMUAN KRITIS] Penggunaan Kunci Hak Akses Penuh (*Service Role Key*) pada Variabel Lingkungan Publik Sisi Klien (DSS05.04, APO12.02)
* **Kondisi (Condition - Hasil Uji Penetrasi Konfigurasi):**  
  Pemeriksaan konfigurasi berkas `.env.local` menunjukkan bahwa variabel `NEXT_PUBLIC_SUPABASE_ANON_KEY` ternyata memuat token JWT dengan payload `"role": "service_role"`. Token ini didistribusikan langsung ke peramban (browser) setiap pengguna karena prefiks `NEXT_PUBLIC_`.
* **Kriteria (Criteria - COBIT 2019 DSS05.04):**  
  Kunci akses berhak istimewa (*privileged credentials/service role*) tidak boleh didistribusikan ke lingkungan yang tidak tepercaya (*untrusted client environment*). Hanya kunci anonim dengan otorisasi terbatas berbasis *Row Level Security (RLS)* yang diizinkan untuk diakses publik.
* **Akar Masalah (Cause):**  
  Kesalahan konfigurasi saat *setup* awal proyek di mana pengembang menyalin *Service Role Key* (yang semestinya hanya untuk server privat) ke variabel publik peramban.
* **Dampak Risiko (Risk Impact - Severity: CRITICAL):**  
  Setiap pengunjung website yang memiliki pemahaman teknis dasar dapat mengekstrak token ini melalui *Developer Tools*, memberikan penyerang wewenang mutlak untuk menghapus, membaca seluruh data, atau mengubah isi tabel database tanpa terhambat kebijakan RLS.
* **Rekomendasi Auditor (Segera / Urgent):**  
  1. Lakukan **Revoke & Regenerate** *service_role* key di konsol Supabase Management segera.
  2. Ganti nilai `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan kunci anonim publik murni (`anon` role).
  3. Pastikan seluruh tabel (`articles`, `categories`, `admins`, `marketplace_price_cache`) menerapkan aturan *Row Level Security (RLS)* yang hanya mengizinkan *READ* bagi publik dan *WRITE* terbatas untuk admin terverifikasi.

#### Temuan 6: [TEMUAN KRITIS] Autentikasi Administrator Berbasis Kata Sandi Teks Mentah (*Plain-Text*) dan Status Login Sisi Klien (DSS05.02, APO12.03)
* **Kondisi (Condition):**  
  Kode pada modul `src/app/admin-login-umkm/page.tsx` memverifikasi kata sandi admin dengan mencocokkan teks polos (*plain text comparison*) langsung ke database (`.eq("password", password)`). Selanjutnya, status keberhasilan login hanya disimpan pada variabel *localStorage* browser (`localStorage.setItem("umkm_admin_logged", "true")`).
* **Kriteria (Criteria - COBIT 2019 DSS05.02):**  
  Sistem autentikasi wajib menerapkan standar perlindungan kata sandi menggunakan fungsi hashing satu arah berkriptografi kuat (seperti Argon2 atau bcrypt dengan salt) serta manajemen sesi berbasis token aman (*HttpOnly secure cookie*) untuk mencegah manipulasi sesi (*session hijacking/tampering*).
* **Akar Masalah (Cause):**  
  Implementasi otentikasi cepat (*quick mockup auth*) tanpa memperhatikan standar *OWASP Top 10* dan *COBIT Security Baseline*.
* **Dampak Risiko (Risk Impact - Severity: CRITICAL):**  
  - Siapapun dapat membobol dashboard admin cukup dengan mengatur flag `localStorage.setItem("umkm_admin_logged", "true")` di konsol browser tanpa perlu mengetahui password.
  - Kata sandi yang tersimpan polos di database rentan bocor jika terjadi kebocoran data.
* **Rekomendasi Auditor:**  
  1. Ganti sistem login kustom dengan **Supabase Auth SDK** yang sudah teruji keamanannya (mendukung OTP, magic link, atau password hashing otomatis).
  2. Implementasikan *Next.js Middleware* di sisi server (`middleware.ts`) untuk memvalidasi token sesi JWT sebelum merender rute `/admin-dashboard/*`.

#### Temuan 7: Ketiadaan Dokumen Risk Register & Rencana Tanggap Insiden / DRP (APO12.01, DSS04.01)
* **Kondisi (Condition):**  
  Organisasi tidak memiliki dokumen daftar risiko (*IT Risk Register*) terpusat, jadwal pencadangan data (*backup schedule*) otomatis, maupun prosedur pemulihan bencana (*Disaster Recovery Plan - DRP*).
* **Kriteria (Criteria - COBIT 2019 APO12.01 & DSS04.03):**  
  Manajemen harus mengidentifikasi kategori ancaman (kegagalan infrastruktur, serangan siber, eror operasional manusia) secara berkala dan menguji prosedur pemulihan sistem dengan target RTO (*Recovery Time Objective*) dan RPO (*Recovery Point Objective*) yang disepakati.
* **Akar Masalah (Cause):**  
  Kurangnya pemahaman mengenai manajemen kontinuitas bisnis (*Business Continuity Management*).
* **Dampak Risiko (Risk Impact - Severity: HIGH):**  
  Jika terjadi kegagalan hosting atau penghapusan basis data tidak disengaja, sistem menghadapi risiko kehilangan seluruh data artikel dan histori simulasi harga secara permanen (*permanent data loss*).
* **Rekomendasi Auditor:**  
  1. Susun **IT Risk Register** yang diperbarui minimal tiap 6 bulan.
  2. Aktifkan fitur *Daily Automated Backup* pada Supabase dan lakukan simulasi pemulihan data (*restore drill*) minimal satu kali setahun.

---

## BAB IV MATRIKS EVALUASI TINGKAT KEMATANGAN (GAP ANALYSIS)

### 4.1 Tabel Penilaian Kapabilitas (*As-Is vs To-Be*)

| Kode Objektif | Nama Objektif COBIT 2019 | Level Saat Ini (*As-Is*) | Target Ideal (*To-Be*) | Gap | Keterangan Status Evaluasi |
|:---|:---|:---:|:---:|:---:|:---|
| **EDM01** | *Ensured Governance Framework Setting* | **1.2** (Performed) | **3.0** (Established) | **-1.8** | Belum ada struktur pengarah formal |
| **EDM02** | *Ensured Benefits Delivery* | **1.0** (Performed) | **2.5** (Managed) | **-1.5** | Realisasi manfaat belum diukur kuantitatif |
| **EDM03** | *Ensured Risk Optimization* | **0.8** (Incomplete) | **3.0** (Established) | **-2.2** | Belum ada batas toleransi risiko formal |
| **APO01** | *Managed I&T Management Framework* | **1.0** (Performed) | **3.0** (Established) | **-2.0** | Struktur pelaporan TI masih tersentral tunggal |
| **APO05** | *Managed Portfolio* | **1.0** (Performed) | **2.5** (Managed) | **-1.5** | Roadmap fitur belum dievaluasi bertingkat |
| **APO06** | *Managed Budget and Costs* | **1.2** (Performed) | **3.0** (Established) | **-1.8** | Ketiadaan TCO dan monitoring pengeluaran |
| **APO07** | *Managed Human Resources* | **1.0** (Performed) | **2.5** (Managed) | **-1.5** | Belum ada deskripsi kerja formal & backup staf |
| **APO12** | *Managed Risk* | **0.8** (Incomplete) | **3.0** (Established) | **-2.2** | Ketiadaan Risk Register tertulis |
| **DSS05** | *Managed Security Services* | **1.0** (Performed) | **3.0** (Established) | **-2.0** | Terdapat kerentanan kredensial dan otentikasi |

### 4.2 Analisis Kesenjangan (*Gap Analysis*)
Rata-rata kapabilitas saat ini berada pada angka **1.0** (*Performed*), yang menunjukkan bahwa operasional TI saat ini baru sebatas berhasil berjalan memenuhi fungsi dasar tanpa dokumentasi terstandar, tanpa manajemen risiko terstruktur, dan rentan terhadap insiden keamanan data. Kesenjangan terbesar terletak pada domain **EDM03 / APO12 (Manajemen Risiko)** dan **DSS05 (Keamanan Operasional)** dengan selisih kesenjangan sebesar **-2.2**.

---

## BAB V REKOMENDASI STRATEGIS & ROADMAP TATA KELOLA

### 5.1 Matriks RACI Rekomendasi
Untuk mengatasi masalah ketiadaan pemisahan tugas, auditor merekomendasikan matriks tanggung jawab RACI (*Responsible, Accountable, Consulted, Informed*) berikut:

| Aktivitas Tata Kelola TI | Product/Business Owner | Lead Developer | Database Administrator | Security/Auditor |
|:---|:---:|:---:|:---:|:---:|
| **Penyusunan Anggaran Tahunan TI (TCO)** | **A / R** | C | C | I |
| **Persetujuan Rilis Fitur Baru ke Produksi** | **A** | R | C | I |
| **Rotasi Kunci API & Kredensial Database** | I | R | **A** | C |
| **Pengelolaan & Publikasi Artikel Edukasi** | **A / R** | I | I | I |
| **Pengujian Kerentanan & Pembaruan Sistem** | I | R | C | **A** |
| **Penyusunan & Pemantauan Risk Register** | **A** | C | C | R |

*Keterangan: **R** = Responsible (Pelaksana), **A** = Accountable (Penanggung Jawab Utama), **C** = Consulted (Konsultan), **I** = Informed (Penerima Informasi).*

---

### 5.2 Rencana Aksi Remediasi (Horizon Waktu)

```
+-------------------------------------------------------------------------------+
|                        ROADMAP IMPLEMENTASI REKOMENDASI                       |
+--------------------------+----------------------------+-----------------------+
| HORIZON 1: IMMEDIATE     | HORIZON 2: MEDIUM-TERM     | HORIZON 3: STRATEGIC  |
| (Minggu 1 - Minggu 4)    | (Bulan 2 - Bulan 3)        | (Bulan 4 - Bulan 6)   |
+--------------------------+----------------------------+-----------------------+
| 1. Revoke Service Role   | 1. Formulir TCO 3 Tahun    | 1. Evaluasi Cap. Level|
|    Key di Supabase       | 2. Implementasi Supabase   |    COBIT Berkala      |
| 2. Perbaiki RLS tabel    |    Auth & Middleware       | 2. Simulasi DRP/      |
| 3. Set Alert Biaya Cloud | 3. Susun IT Risk Register  |    Disaster Recovery  |
| 4. Pisahkan akun admin   | 4. Terapkan PR Review di   | 3. Sertifikasi/Audit  |
|    dari localStorage     |    GitHub Repository       |    Kepatuhan Eksternal|
+--------------------------+----------------------------+-----------------------+
```

---

### 5.3 Opini dan Kesimpulan Akhir Auditor

#### Kesimpulan Opini:
Berdasarkan hasil audit independen mengacu pada kerangka kerja COBIT 2019, sistem platform **UMKM Go Digital** secara fungsional telah berhasil memberikan nilai awal bagi target penggunanya melalui antarmuka edukasi dan simulasi harga. Namun demikian, dari perspektif tata kelola TI (*IT Governance*), sistem berada pada status **"Qualified / Memerlukan Perhatian Khusus"** akibat tingginya risiko pada aspek keamanan informasi (eksposur kredensial) serta ketiadaan pemisahan peran dan rencana anggaran berkelanjutan.

Apabila rekomendasi pada **Horizon 1** segera diimplementasikan, tingkat risiko operasional sistem akan turun drastis, sehingga platform dapat beroperasi secara stabil, aman, dan berkelanjutan dalam mendukung transformasi digital UMKM Indonesia.

---

**Tim Auditor Sistem Informasi**  
*Lead Information System Auditor (COBIT 2019 Practitioner)*  
*Dokumen Disahkan Secara Elektronik.*
