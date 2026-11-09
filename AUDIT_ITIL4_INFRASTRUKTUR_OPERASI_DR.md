# Audit Infrastruktur dan Operasi TI
## Ruang Server/Data Center, Kapasitas Jaringan, dan Disaster Recovery Plan

**Objek audit:** UMKM Go Digital<br>
**Tanggal:** 9 November 2026<br>
**Jenis penugasan:** Audit ulang atas penilaian sebelumnya<br>
**Versi laporan:** 1.1<br>
**Acuan utama:** ITIL 4<br>
**Acuan pendukung:** ISO/IEC 20000-1:2018<br>
**Jenis audit:** Desk review dokumentasi dan artefak repositori<br>
**Status:** Kesimpulan awal; validasi operasional dan konfirmasi pemilik layanan diperlukan

## 1. Ringkasan eksekutif

Aplikasi didokumentasikan menggunakan Next.js dan Supabase, serta menyebut Vercel sebagai opsi deployment. [Konfigurasi klien Supabase](./src/lib/supabaseClient.ts) menunjukkan bahwa aplikasi menginisialisasi klien dengan URL dan anon key dari environment, tetapi tidak mengungkap lokasi produksi, arsitektur hosting, atau kapasitas jaringan. Dokumentasi yang ditelaah tidak membuktikan bahwa deployment produksi benar-benar berada di Vercel atau bagaimana kontrol fisik penyedia diterapkan.

Bagian backup pada manual menginstruksikan administrator mengekspor data dari panel hosting, tetapi tidak menetapkan frekuensi atau proses pemulihan. Dalam artefak yang ditelaah, tidak ditemukan Rencana Pemulihan Bencana (DRP) dengan pemicu, peran, prioritas layanan, RPO/RTO, langkah failover/restore, komunikasi, dan hasil uji. Demikian pula, tidak ditemukan baseline atau bukti pemantauan kapasitas, ketersediaan, latensi, atau penggunaan jaringan.

**Kesimpulan auditor:** Dari bukti repositori, tata kelola fasilitas/data center, kapasitas jaringan, dan pemulihan bencana **belum dapat dibuktikan memadai**. Ini bukan kesimpulan bahwa fasilitas penyedia tidak memadai atau backup tidak tersedia. Penilaian efektivitas kontrol produksi masih terbuka sampai konfigurasi aktual, perjanjian penyedia, telemetri, dan hasil uji diperiksa. Sebelum layanan dinyatakan siap menghadapi gangguan besar, organisasi perlu memprioritaskan inventaris arsitektur/penyedia, sasaran pemulihan yang disetujui, dan uji restore yang tercatat.

## 2. Tujuan, ruang lingkup, dan keterbatasan

Audit menilai apakah bukti yang tersedia menunjukkan pengendalian memadai atas:

1. **Ruang server/data center:** lokasi dan model hosting, tanggung jawab organisasi versus penyedia, pemilihan region, perlindungan fisik dan lingkungan, serta assurance penyedia.
2. **Kapasitas jaringan:** kebutuhan dan baseline trafik, kinerja end-to-end, kapasitas layanan, ambang peringatan, tren, dan rencana peningkatan kapasitas.
3. **Disaster recovery:** penilaian dampak, strategi pemulihan, backup, RPO/RTO, peran, komunikasi, dependensi, pengujian, dan tindak lanjut.

Penelaahan terbatas pada dokumentasi, konfigurasi, dan kode yang tersedia di repositori. Audit ini **tidak** melakukan kunjungan fisik, pengujian jaringan/load, akses ke dashboard cloud, verifikasi kontrak/SLA, wawancara, pemeriksaan tagihan, penelaahan log produksi, atau uji pemulihan. Ketiadaan dokumen di repositori berarti kontrol belum dapat diverifikasi, bukan bukti definitif bahwa tidak ada kontrol atau dokumen lain di luar repositori.

Audit ulang memeriksa ulang klaim laporan sebelumnya terhadap artefak sumber yang dapat ditelusuri. Cakupan audit ulang tetap desk review; tidak ada bukti produksi atau bukti baru dari pengelola yang diserahkan untuk mengubah batasan tersebut.

## 3. Kriteria audit

### ITIL 4

- **Infrastructure and Platform Management:** pengelolaan infrastruktur dan platform yang mendukung layanan.
- **Capacity and Performance Management:** kapasitas dan kinerja layanan serta komponennya memenuhi kebutuhan saat ini dan yang diproyeksikan.
- **Availability Management:** layanan dan komponen tersedia sesuai kebutuhan yang disepakati.
- **IT Service Continuity Management:** kesiapan pemulihan layanan TI sesuai kebutuhan dan sasaran kontinuitas.
- **Monitoring and Event Management:** pemantauan layanan/komponen, deteksi kondisi penting, dan penanganan peristiwa.
- **Supplier Management:** kinerja, risiko, dan tanggung jawab penyedia dikelola berdasarkan kebutuhan layanan.
- **Service Level Management:** target layanan dan pelaporan kinerja ditetapkan dan ditinjau.

### ISO/IEC 20000-1:2018 (acuan pendukung)

- Klausul **8.3** Relationship and agreement, termasuk pengelolaan pemasok dan perjanjian.
- Klausul **8.7.1** Capacity management.
- Klausul **8.7.2** Service availability management.
- Klausul **8.7.3** Service continuity management.

Audit ini tidak menerbitkan opini sertifikasi ISO/IEC 20000 dan tidak menetapkan tingkat kematangan ITIL.

### Matriks bukti utama

| Area | Bukti yang diperiksa | Yang dapat disimpulkan | Yang belum dapat disimpulkan |
|---|---|---|---|
| Arsitektur/fasilitas | [README.md](./README.md#L10-L32), [supabaseClient.ts](./src/lib/supabaseClient.ts) | Teknologi menyebut Supabase; Vercel disebut sebagai opsi; klien aplikasi membaca URL/key dari environment | Hosting produksi, region, pusat data, redundansi fasilitas, kontrol fisik, SLA, dan assurance penyedia |
| Jaringan/kapasitas | [ci.yml](./.github/workflows/ci.yml#L1-L30), [package.json](./package.json#L1-L18), [next.config.ts](./next.config.ts) | Repositori memiliki CI lint/build dan konfigurasi Next.js dasar | Baseline trafik, throughput, latency, availability, packet loss, kuota layanan, load test, atau tren kapasitas |
| Backup/DR | [Manual_Book_UMKM_Go_Digital.md](./Manual_Book_UMKM_Go_Digital.md#L175-L177) | Manual menginstruksikan ekspor data dari panel hosting | Backup aktual/otomatis, retensi, lokasi salinan, keberhasilan restore, RPO/RTO, DRP, atau hasil latihan |

### Dasar penetapan prioritas

Prioritas pada laporan ini bersifat awal dan kualitatif. **Tinggi** digunakan ketika kekurangan bukti/kontrol berpotensi menghambat pemulihan layanan atau pemenuhan kebutuhan data dan belum ada mitigasi yang dapat diverifikasi; **Sedang** digunakan untuk gap tata kelola/kapasitas yang memerlukan validasi dan dapat berkembang menjadi dampak layanan. Prioritas bukan hasil penghitungan probabilitas dan dampak yang telah disetujui manajemen. Peringkat dapat berubah setelah BIA, penilaian risiko, dan pemeriksaan kontrol produksi.

## 4. Ringkasan temuan dan prioritas

| ID | Area | Prioritas | Kesimpulan |
|---|---|---|---|
| I-01 | Ruang server/data center dan pengawasan penyedia cloud | Sedang | Model tanggung jawab, lokasi, SLA, dan bukti assurance belum tersedia untuk diverifikasi |
| I-02 | Kapasitas dan kinerja jaringan | Sedang | Tidak ditemukan baseline, target, pemantauan, atau rencana kapasitas |
| I-03 | DRP dan sasaran pemulihan | Tinggi | Prosedur pemulihan, RPO/RTO, peran dan strategi failover belum terbukti |
| I-04 | Backup, pengujian restore, dan kesiapan operasional | Tinggi | Panduan menyebut ekspor manual, tanpa bukti kontrol backup atau uji pemulihan |

Prioritas menunjukkan urgensi tindak lanjut berdasarkan potensi dampak, bukan skor risiko kuantitatif. Penetapan risiko residual memerlukan konfirmasi dampak bisnis, jumlah pengguna, kebutuhan layanan, dan kontrol aktual.

## 5. Rincian temuan

### I-01 — Assurance fasilitas data center dan model tanggung jawab penyedia belum dapat diverifikasi

**Prioritas: Sedang**<br>
**Kriteria:** ITIL 4 Infrastructure and Platform Management; Supplier Management; ISO/IEC 20000-1 klausul 8.3

**Kondisi dan bukti:** [README.md](./README.md#L10-L32) menyebut Supabase sebagai database dan Vercel sebagai platform yang dapat digunakan untuk deployment. Repositori tidak memuat diagram arsitektur produksi, lokasi/region layanan, daftar subprosesor, SLA, pembagian tanggung jawab, laporan assurance atau sertifikasi penyedia, bukti review kontrol fisik, maupun rencana exit dari penyedia. Tidak ada bukti bahwa organisasi mengoperasikan ruang server sendiri.

**Risiko/dampak:** Tanpa pemahaman tanggung jawab bersama dan bukti penyedia yang relevan, organisasi mungkin tidak mengetahui batas kontrolnya atas akses fisik, listrik/cooling, redundansi fasilitas, pemulihan penyedia, lokasi data, atau kewajiban pemberitahuan insiden. Risiko ini meningkat bila layanan produksi bergantung pada satu region atau satu penyedia tanpa strategi alternatif.

**Rekomendasi:**

1. Konfirmasi hosting produksi yang benar-benar digunakan, service tier, region, arsitektur, dependensi, serta pemilik akun dan kontraknya.
2. Dokumentasikan model shared responsibility untuk aplikasi, platform, database, DNS/domain, dan penyedia terkait.
3. Dapatkan dan tinjau SLA, status layanan, kebijakan backup/retensi, proses incident notification, serta laporan assurance terkini yang tersedia dari penyedia. Catat pengecualian dan masa berlaku dokumen.
4. Nilai kebutuhan lokasi/residensi data, ketergantungan region, opsi ekspor, dan rencana pemindahan/exit berdasarkan dampak layanan.
5. Jika terdapat ruang server yang dikelola organisasi di luar layanan cloud, lakukan inspeksi fisik terpisah atas kontrol akses, CCTV/log akses, proteksi kebakaran/air, UPS/genset, pendinginan, deteksi lingkungan, pemeliharaan, dan bukti uji.

**Bukti penutupan:** diagram arsitektur dan aliran dependensi yang disetujui; inventaris layanan/region; SLA dan laporan assurance yang ditinjau; daftar gap dan mitigasi; bukti inspeksi bila ada fasilitas sendiri.

### I-02 — Pengelolaan kapasitas dan kinerja jaringan belum dapat diverifikasi

**Prioritas: Sedang**<br>
**Kriteria:** ITIL 4 Capacity and Performance Management; Monitoring and Event Management; Service Level Management; ISO/IEC 20000-1 klausul 8.7.1 dan 8.7.2

**Kondisi dan bukti:** Dalam artefak repositori yang ditelaah, tidak ditemukan baseline trafik, proyeksi pertumbuhan pengguna, batas kapasitas, target latensi/ketersediaan, pemantauan error atau waktu respons, ambang alert, hasil uji beban, maupun tinjauan tren. Konfigurasi aplikasi yang tersedia menggunakan Supabase client dari aplikasi, tetapi tidak menunjukkan topologi jaringan produksi atau telemetry end-to-end. Pipeline CI pada [ci.yml](./.github/workflows/ci.yml#L1-L30) menjalankan lint dan build; itu bukan pengukuran kapasitas jaringan atau kinerja produksi. Dengan demikian, audit ini tidak dapat menyimpulkan bahwa pengelolaan kapasitas tidak dilakukan di luar repositori.

**Risiko/dampak:** Kemacetan pada jalur pengguna-ke-aplikasi, aplikasi-ke-database, DNS, atau layanan pihak ketiga dapat diketahui terlambat. Tanpa tren pemakaian dan ambang, pengelola juga tidak memiliki dasar untuk membedakan lonjakan normal, bottleneck, gangguan penyedia, atau kebutuhan peningkatan kapasitas.

**Rekomendasi:**

1. Petakan jalur kritis dan dependensi: pengguna, DNS/CDN/hosting aplikasi, Supabase/database, serta layanan eksternal yang digunakan.
2. Tetapkan indikator dan target berdasarkan kebutuhan bisnis: availability, p50/p95 latency, error rate, throughput/request volume, koneksi database, dan penggunaan kuota layanan. Tentukan ambang serta pemilik alert.
3. Rekam baseline pada beban normal dan puncak; buat proyeksi kapasitas dan tinjau tren secara rutin.
4. Uji beban secara terkendali pada lingkungan yang disetujui; tetapkan batas, rencana penghentian uji, dan larangan menjalankan load test terhadap produksi tanpa persetujuan.
5. Tinjau batas kuota, throttling, batas koneksi, scaling behavior, dan biaya pada tier penyedia aktual; dokumentasikan tindakan saat mendekati batas.

**Bukti penutupan:** diagram jaringan/dependensi; target layanan yang disetujui; rekaman dashboard dan alert; hasil baseline/uji beban; notulen review tren dan keputusan kapasitas.

### I-03 — Disaster Recovery Plan belum ditemukan dan sasaran pemulihan belum ditetapkan

**Prioritas: Tinggi**<br>
**Kriteria:** ITIL 4 IT Service Continuity Management; Availability Management; ISO/IEC 20000-1 klausul 8.7.2 dan 8.7.3

**Kondisi dan bukti:** Tidak ditemukan DRP yang menetapkan skenario gangguan, klasifikasi dampak, urutan pemulihan, pemilik keputusan, tim respons, RPO, RTO, dependensi, komunikasi, kriteria deklarasi bencana, failover, atau langkah kembali ke operasi normal. Panduan menyebut ekspor data sebagai tindakan backup, tetapi tidak menyediakan prosedur pemulihan layanan secara menyeluruh ([Manual_Book_UMKM_Go_Digital.md](./Manual_Book_UMKM_Go_Digital.md#L175-L177)).

**Risiko/dampak:** Saat kehilangan region, kegagalan database/hosting, kompromi akun cloud, atau kehilangan data, tim mungkin tidak dapat menentukan prioritas dan urutan tindakan. Waktu henti dan kehilangan data yang terjadi dapat melampaui toleransi organisasi dan pengguna.

**Rekomendasi:**

1. Lakukan Business Impact Analysis (BIA) untuk mengidentifikasi layanan kritis, dampak, dependensi, periode puncak, dan toleransi downtime/data loss.
2. Minta pemilik layanan menyetujui RTO dan RPO yang realistis; jangan menetapkan angka tanpa analisis biaya, kemampuan penyedia, dan kebutuhan pengguna.
3. Buat DRP yang mencakup skenario kegagalan aplikasi, database, kredensial/akun cloud, jaringan/DNS, region, dan penyedia; tetapkan pemimpin insiden, pengganti, kontak, urutan pemulihan, sumber data otoritatif, kriteria failover/failback, komunikasi, dan eskalasi pemasok.
4. Pastikan rencana mencakup akses darurat yang aman, salinan konfigurasi dan prosedur, serta jalur alternatif untuk menghubungi personel ketika kanal utama tidak tersedia.
5. Tinjau DRP setelah perubahan arsitektur besar atau insiden dan sekurang-kurangnya secara berkala sesuai tingkat risiko.

**Bukti penutupan:** BIA dan sasaran RTO/RPO yang disetujui; DRP terkendali versinya; daftar kontak dan tanggung jawab yang telah diuji; bukti review dan persetujuan.

### I-04 — Kontrol backup dan kemampuan restore belum dibuktikan melalui pengujian

**Prioritas: Tinggi**<br>
**Kriteria:** ITIL 4 IT Service Continuity Management; Infrastructure and Platform Management; ISO/IEC 20000-1 klausul 8.7.3

**Kondisi dan bukti:** Bagian backup pada manual menginstruksikan administrator mengekspor data konten dan tabel dari dashboard hosting, tetapi tidak menentukan frekuensi, cakupan, retensi, enkripsi, pemisahan akun/lokasi, pemantauan keberhasilan, pemilik tugas, atau uji restore ([Manual_Book_UMKM_Go_Digital.md](./Manual_Book_UMKM_Go_Digital.md#L175-L177)). Tidak ditemukan bukti konfigurasi backup penyedia, log keberhasilan, inventaris backup, atau hasil simulasi pemulihan.

**Risiko/dampak:** Backup mungkin tidak mencakup konfigurasi atau data yang diperlukan untuk memulihkan layanan, tidak mutakhir, tidak dapat diakses ketika akun utama terganggu, atau gagal dipulihkan. Risiko ini dapat berujung pada kehilangan data dan downtime yang tidak diketahui batasnya.

**Rekomendasi:**

1. Verifikasi backup otomatis yang tersedia pada service tier aktual; dokumentasikan apa yang dicakup dan dikecualikan, retensi, serta batas pemulihannya.
2. Definisikan jadwal backup/ekspor, retensi, enkripsi, kontrol akses, pemisahan salinan, dan pemantauan kegagalan sesuai RPO yang disetujui.
3. Jaga salinan data/configuration dan instruksi pemulihan agar tidak bergantung hanya pada satu akun atau komponen yang sama dengan produksi.
4. Uji restore ke lingkungan terisolasi; ukur waktu pemulihan dan titik data terakhir; validasi integritas serta fungsi aplikasi; catat hasil, penyimpangan, dan perbaikan.
5. Pastikan proses mencakup kredensial/secret secara aman tanpa memasukkannya ke backup yang dapat diakses pihak tidak berwenang.

**Bukti penutupan:** kebijakan backup; konfigurasi aktual dan bukti job; laporan kegagalan/sukses; laporan uji restore dengan waktu dan titik pemulihan; daftar tindakan korektif yang ditutup.

## 6. Program tindak lanjut yang disarankan

| Jangka waktu | Tindakan | Prioritas | Bukti yang diminta auditor |
|---|---|---|---|
| 0–30 hari | Konfirmasi platform, region, service tier, topologi, pemilik akun, SLA dan model shared responsibility | Tinggi | Diagram aktual, inventaris penyedia, SLA, hasil review assurance |
| 0–30 hari | Verifikasi fungsi backup yang aktif dan amankan ekspor/salinan kritis | Tinggi | Konfigurasi, bukti job, lokasi/retensi, daftar akses |
| 0–30 hari | Tentukan layanan kritis, pemilik DR, kontak eskalasi, dan proses deklarasi insiden | Tinggi | Daftar peran/kontak, draf prosedur respons |
| 31–60 hari | Selesaikan BIA dan setujui RTO/RPO berdasarkan kebutuhan bisnis | Tinggi | BIA, persetujuan pemilik layanan/manajemen |
| 31–60 hari | Terbitkan DRP dan runbook pemulihan aplikasi/database/jaringan | Tinggi | DRP versi terkendali dan runbook yang direview |
| 31–60 hari | Tetapkan metrik kapasitas/kinerja, baseline awal, dan alert | Sedang | Dashboard, target/ambang, hasil baseline |
| 61–90 hari | Jalankan uji restore dan latihan tabletop DR; catat waktu serta gap | Tinggi | Skenario, peserta, hasil, tindakan korektif |
| 61–90 hari | Lakukan uji kapasitas terkontrol dan tinjau kuota/limit penyedia | Sedang | Rencana uji, hasil, proyeksi dan keputusan kapasitas |

## 7. Bukti tambahan yang perlu diminta dalam audit lapangan

- Diagram arsitektur terkini dan inventaris aset/layanan, region, akun, DNS, serta dependensi.
- Kontrak, SLA, status layanan, bukti assurance/audit penyedia, dan proses notifikasi insiden.
- Bukti kontrol dan inspeksi data center jika organisasi mengelola fasilitas fisik sendiri.
- Dashboard availability, latency, throughput, error, kuota, dan alert untuk periode representatif.
- Hasil uji beban yang disetujui, laporan kapasitas, dan keputusan scaling.
- BIA, DRP, runbook, daftar kontak, bukti backup, laporan uji restore, dan latihan DR.
- Catatan insiden/gangguan sebelumnya, analisis akar penyebab, dan status tindakan korektif.

## 8. Kesimpulan

Repositori memberikan indikasi penggunaan platform cloud, tetapi belum menjadi bukti cukup untuk menyimpulkan bahwa kontrol ruang server/data center, kapasitas jaringan, dan disaster recovery berjalan efektif. Area yang paling kritis adalah belum adanya bukti sasaran pemulihan yang disetujui dan uji restore yang menunjukkan layanan dapat pulih dalam batas waktu serta kehilangan data yang dapat diterima.

Manajemen sebaiknya terlebih dahulu memastikan arsitektur dan kewajiban penyedia yang benar-benar digunakan, lalu menyelesaikan BIA, menetapkan RPO/RTO, menerbitkan DRP, dan membuktikan proses pemulihan melalui pengujian. Pada saat yang sama, baseline kapasitas dan pemantauan kinerja harus mulai dikumpulkan agar keputusan infrastruktur didasarkan pada data, bukan asumsi.
