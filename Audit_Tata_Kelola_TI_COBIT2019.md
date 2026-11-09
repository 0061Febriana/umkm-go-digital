# 🔍 Catatan Kritis Auditor: Bedah Tata Kelola TI "UMKM Go Digital"
### *Tinjauan Praktis & Blak-blakan Menggunakan Lensa Framework COBIT 2019*

> **Quick Take / Catatan Awal:**  
> Platform **UMKM Go Digital** punya visi jempolan: membantu pelaku UMKM melek literasi digital dan menghitung simulasi harga secara akurat. Tampilan antarmuka dan fiturnya sudah berjalan.  
> Namun, jika kita bedah dari kacamata **Tata Kelola TI (IT Governance)** menggunakan framework **COBIT 2019**, sistem ini masih berada di fase *"yang penting aplikasinya jalan dulu"*. Secara kapabilitas kematangan, skornya masih berkutat di **Level 1 (Performed)** dari skala 5.  
> Terdapat 3 *blind spot* utama yang harus dibenahi: **jebakan biaya cloud (APO06)**, **masalah klasik one-man show tanpa pemisahan peran (APO01/APO07)**, dan **risiko keamanan kritis di sisi database dan autentikasi (DSS05/APO12)**.

Berikut adalah catatan hasil audit lapangan secara lugas, to-the-point, dan bebas dari bahasa birokrasi yang kaku.

---

## 💸 1. Investasi & Anggaran TI: "Jebakan Manis Free-Tier"
*(Lensa COBIT 2019: EDM02 Benefits Delivery, APO05 Portfolio Management, APO06 Budget & Cost Management)*

### 🧐 Realita di Lapangan
Aplikasi saat ini bertumpu pada paket gratis (*free-tier*) dari berbagai penyedia cloud: Vercel untuk hosting frontend, Supabase untuk database, dan pustaka eksternal lainnya. Di awal masa perancangan, cara ini terasa sangat cerdas karena pengeluaran operasionalnya **Rp 0**.

### ⚠️ Kritik & Temuan Auditor
1. **Tidak Ada Hitungan TCO (*Total Cost of Ownership*):**  
   Banyak pengembang lupa bahwa *free-tier* memiliki plafon ketat: kuota transfer data (*egress bandwidth*), kuota *database read/write*, dan batas *active connections*. Jika inisiatif UMKM ini viral dan diakses 1.000 penjual secara bersamaan dalam sehari, kuota gratis bisa ludes dalam hitungan jam.
2. **Ketiadaan *Spend-Capping* dan *Billing Alert*:**  
   Tidak ada konfigurasi pembatas tagihan pada akun cloud. Jika kartu kredit terhubung dan sistem otomatis berpindah ke skema *pay-as-you-go*, pembengkakan tagihan bisa terjadi tiba-tiba tanpa disadari pengelola.
3. **Realisasi Manfaat Belum Terukur (*Value Delivery* - EDM02):**  
   Belum ada instrumen metrik bisnis nyata: seberapa sering kalkulator harga dipakai? Apakah strategi yang dibaca meningkatkan omzet UMKM? Tanpa data ini, investasi waktu dan tenaga pengembang tidak terbukti menghasilkan nilai nyata (*business value*).

### 💡 Saran Aksi Praktis
* **Pasang Billing Alerts Sekarang:** Pasang notifikasi email di Supabase dan Vercel jika kuota komputasi menyentuh ambang 50% dan 80%.
* **Buat Proyeksi Biaya 1 Tahun:** Hitung estimasi jika platform beralih ke paket mandiri (misal: Supabase Pro ~$25/bln + domain tahunan). Siapkan pos kas operasional agar layanan tidak mati mendadak saat kuota gratis habis.

---

## 👥 2. Struktur Organisasi: "Sindrom Superman / One-Man Show"
*(Lensa COBIT 2019: EDM01 Governance Setting, APO01 Management Framework, APO07 Human Resources)*

### 🧐 Realita di Lapangan
Dalam proyek ini, orang yang merancang UI, mengoding frontend & backend, mengelola database produksi di Supabase, hingga yang menulis artikel edukasi adalah **orang yang sama**.

### ⚠️ Kritik & Temuan Auditor
1. **Risiko Ketergantungan Ekstrem (*Bus Factor = 1*):**  
   Seluruh pengetahuan sistem, kunci akses cloud, dan alur perbaikan hanya ada di kepala satu orang. Jika orang tersebut berhalangan, sakit, atau tidak dapat dihubungi, sistem langsung lumpuh total tanpa ada yang bisa menggantikan.
2. **Nol Pemisahan Tugas (*Lack of Segregation of Duties - SoD*):**  
   Di dunia tata kelola yang sehat, pengembang kode tidak boleh memiliki wewenang mengubah data produksi secara bebas tanpa *audit trail*. Saat ini, satu akun memegang *"hak dewa"* (bisa mengubah, menghapus artikel, merusak skema data) tanpa proses peninjauan (*peer-review*).
3. **Absennya Komite Pengarah (*IT Steering Committee*):**  
   Tidak ada jembatan antara tim teknis dengan pihak bisnis/perwakilan UMKM. Keputusan fitur baru berjalan murni berdasarkan asumsi sepihak pengembang, bukan dari riset kebutuhan prioritas pengguna.

### 💡 Saran Aksi Praktis
* **Bagi Peran Minimal Menjadi 3 Fungsi:**
  - **Penanggung Jawab Konten:** Khusus mengurus artikel edukasi dan kebijakan lewat dashboard (tanpa akses ke database atau source code).
  - **Pengembang Teknis:** Fokus pada kode fitur dan perbaikan bug.
  - **Pemilik Sistem (*System Owner*):** Memegang master credential dan kebijakan privasi.
* **Wajibkan Pull Request (PR) di GitHub:** Jangan langsung mendorong (*push*) perubahan ke cabang `main`. Terapkan aturan minimal ada satu review sebelum kode digabungkan ke server live.

---

## 🛡️ 3. Manajemen Risiko & Keamanan: "Blind Spot yang Mengintai"
*(Lensa COBIT 2019: EDM03 Risk Optimization, APO12 Risk Management, DSS05 Security Services)*

Dari penelusuran langsung pada kode sumber dan basis data, area inilah yang paling banyak memicu **lampu merah (temuan kritis)** bagi seorang auditor.

### ⚠️ Kritik & Temuan Auditor
1. **🚨 TEMUAN KRITIS: Service Role Key Supabase Terekspos ke Publik (`.env.local`)**  
   Variabel `NEXT_PUBLIC_SUPABASE_ANON_KEY` di lingkungan proyek ternyata diisi oleh token dengan role `service_role`.  
   *Kenapa ini fatal?* Awalan `NEXT_PUBLIC_` membuat token ini terkirim langsung ke peramban (browser) siapa pun yang membuka web. Pengunjung yang paham web cukup membuka *Inspect Element -> Console/Network* untuk menyalin token tersebut, lalu dapat **menghapus seluruh tabel basis data** tanpa terhalang aturan keamanan RLS (*Row Level Security*).
2. **🚨 TEMUAN KRITIS: Autentikasi Admin Polos & Validasi di Browser**  
   Pada modul login admin (`/admin-login-umkm`), kata sandi dicocokkan langsung dalam bentuk teks polos (*plain text*, tanpa enkripsi hash seperti bcrypt). Selain itu, status login hanya disimpan di `localStorage.setItem("umkm_admin_logged", "true")`. Siapa pun bisa membobol dashboard admin cukup dengan mengetik baris perintah tersebut di konsol browser tanpa perlu mengetahui kata sandi aslinya.
3. **Ketiadaan Rencana Pemulihan Bencana (*No Disaster Recovery Plan*):**  
   Tidak ada dokumen pencatatan risiko (*Risk Register*) dan belum ada jadwal backup otomatis yang teruji. Jika database terhapus karena kesalahan eksekusi perintah SQL, seluruh data artikel edukasi dan data kalkulasi margin hilang secara permanen.

### 💡 Saran Aksi Praktis (Kerjakan Segera!)
* **Cabut & Ganti (*Rotate*) Kunci Supabase Hari Ini:** Masuk ke konsol Supabase, revoke service role key, dan pastikan file `.env.local` hanya menggunakan **anon public key**.
* **Modernisasi Sistem Login:** Manfaatkan fitur bawaan **Supabase Auth** yang sudah teruji keamanannya (otomatis mengenkripsi password dengan standar industri dan memakai cookie sesi aman) daripada mengecek password manual.
* **Aktifkan Automated Daily Backup:** Nyalakan jadwal snapshot otomatis di Supabase agar data dapat dipulihkan kapan saja jika terjadi insiden.

---

## 📊 Scorecard Kematangan (COBIT 2019 Reality Check)

Evaluasi kematangan tata kelola UMKM Go Digital berdasarkan skala 0 sampai 5 COBIT:

```
[0: Belum Ada] -> [1: Berjalan Ad-Hoc] -> [2: Terkelola] -> [3: Standar Baku] -> [4/5: Optimal]

1. Investasi & Anggaran TI (APO06)   : [1.2 / 5.0]  --> Bergantung free-tier, belum ada TCO
2. Struktur Organisasi & SDM (APO01) : [1.0 / 5.0]  --> One-man show, tanpa pemisahan tugas
3. Manajemen Risiko (APO12)          : [0.8 / 5.0]  --> Belum ada dokumen mitigasi risiko
4. Keamanan Sistem (DSS05)           : [1.0 / 5.0]  --> Kredensial bocor & autentikasi rentan
```

> **Rata-rata Kapabilitas: Level 1.0 (Performed)**  
> **Maknanya:** Sistem ini hidup dan berhasil melayani pengguna, tetapi fondasi tata kelola, perencanaan biaya, dan perlindungan keamanannya masih sangat rentan terhadap insiden dan risiko downtime.

---

## 🎯 To-Do List Perbaikan (Actionable Checklist)

Agar audit ini tidak berhenti sebatas kritik, berikut daftar prioritas langkah pembenahan:

### 🔥 Minggu Ini (Mendesak & Wajib):
- [ ] Ganti `service_role` key pada `.env.local` dengan `anon` public key resmi.
- [ ] Pasang aturan RLS (*Row Level Security*) ketat pada seluruh tabel Supabase.
- [ ] Atur notifikasi pembatas anggaran (*billing alerts*) di Vercel & Supabase.

### 📦 Bulan Depan (Merapikan Rumah):
- [ ] Perbaiki login admin menggunakan Supabase Auth dan middleware sisi server (hapus otentikasi via `localStorage`).
- [ ] Buat dokumen *Risk Register* sederhana (skenario jika database mati, kuota habis, atau data korup).
- [ ] Pisahkan hak akses: akun penulis artikel tidak boleh memegang akses ke server/database.

### 🚀 Jangka Panjang (Skalabilitas & Keberlanjutan):
- [ ] Susun rencana anggaran operasional tahunan platform.
- [ ] Buat survei kepuasan berkala kepada pelaku UMKM pengguna fitur simulasi harga.

---

*Catatan Akhir Auditor:*  
Aplikasi ini memiliki potensi besar dan sangat bermanfaat bagi ekosistem UMKM. Jangan biarkan kerja keras penulisan kode ini menjadi sia-sia hanya karena tata kelola, anggaran, dan celah keamanan diabaikan di belakang layar!
