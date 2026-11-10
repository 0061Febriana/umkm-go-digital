# Audit Pengembangan Sistem UMKM Go Digital

## 1. Latar Belakang
Sistem UMKM Go Digital dikembangkan sebagai platform edukasi dan pendampingan UMKM dengan fokus pada strategi digital, kebijakan marketplace, tips toko online, dan simulasi harga. Aplikasi ini dibangun menggunakan Next.js, React, TypeScript, dan Supabase.

Berdasarkan hasil analisis terhadap artefak proyek, sistem ini memiliki konsep yang relevan dan potensi untuk dikembangkan lebih lanjut. Namun, dari sisi proses pengembangan perangkat lunak, terdapat beberapa celah signifikan yang perlu ditinjau secara kritis, terutama terkait kebutuhan, pengujian aplikasi, dan prosedur migrasi data.

## 2. Metode Audit
Audit ini menggunakan pendekatan ISO/IEC 12207, yang menekankan siklus hidup perangkat lunak, termasuk:
- analisis kebutuhan,
- verifikasi dan validasi,
- pengujian perangkat lunak,
- manajemen konfigurasi,
- migrasi data,
- pemeliharaan,
- dan dokumentasi proses.

## 3. Ruang Lingkup Audit
Audit mencakup tiga area utama:
1. Analisis kebutuhan sistem
2. Pengujian aplikasi dan UAT
3. Prosedur migrasi data

## 4. Hasil Audit

### 4.1 Analisis Kebutuhan
Temuan utama:
- Kebutuhan umum aplikasi sudah terlihat pada dokumen proyek dan halaman utama sistem.
- Namun kebutuhan fungsional dan non-fungsional tidak terdokumentasi secara formal.
- Tidak ditemukan dokumen requirement specification, user stories, atau acceptance criteria.
- Tidak ada bukti sign-off stakeholder terhadap kebutuhan.

Penilaian:
- Kebutuhan belum dikelola sesuai prinsip ISO/IEC 12207.
- Risiko: sistem dibangun berdasarkan asumsi pengembang, bukan kebutuhan yang tervalidasi.

### 4.2 Pengujian Aplikasi dan UAT
Temuan utama:
- Proses CI hanya melakukan lint dan build, tetapi tidak ada bukti pengujian fungsional.
- Tidak terdapat unit test, integration test, atau hasil UAT.
- Tidak ada bukti bahwa fungsi utama seperti login admin, pengelolaan artikel, dan simulasi harga telah diuji oleh pengguna akhir.
- Tidak ada laporan defect yang terdokumentasi dan tidak ada prosedur penerimaan sistem.

Penilaian:
- Pengujian aplikasi belum memenuhi prinsip verification dan validation dalam ISO/IEC 12207.
- Risiko: bug dan kesalahan fungsional berpotensi lolos ke lingkungan produksi.

### 4.3 Prosedur Migrasi Data
Temuan utama:
- Skema database tersedia, tetapi prosedur migrasi data belum terdokumentasi.
- Tidak ada backup, rollback plan, mapping field, dan reconciliation report.
- Tidak ada dokumen cutover plan atau validasi data sebelum dan sesudah migrasi.
- Keamanan data tidak sesuai kontrol dasar, seperti:
  - password admin disimpan secara plain text,
  - autentikasi berbasis localStorage,
  - kebijakan row-level security dibuat terlalu longgar.

Penilaian:
- Prosedur migrasi data belum memadai untuk lingkungan produksi.
- Risiko: kehilangan data, data tidak konsisten, dan kebocoran data sensitif.

## 5. Penilaian Berdasarkan ISO/IEC 12207
| Proses | Kondisi | Penilaian |
|---|---|---|
| Requirement Analysis | Tidak terdokumentasi secara formal | Tidak memadai |
| Verification and Validation | Hanya lint dan build | Tidak memadai |
| Software Testing | Tidak ada test case atau hasil UAT | Tidak memadai |
| Configuration Management | Skema data ada, tetapi belum dikelola secara formal | Tidak memadai |
| Data Migration | Belum ada prosedur yang lengkap | Tidak memadai |
| Security Management | Keamanan data lemah | Tidak memadai |
| Documentation Management | Dokumentasi operasional belum lengkap | Sebagian |

## 6. Temuan Kritis
1. Kebutuhan sistem belum terdokumentasi dan divalidasi secara formal.
2. UAT belum dibuktikan secara nyata.
3. Keamanan data belum memenuhi kontrol dasar.
4. Prosedur migrasi data belum siap untuk lingkungan produksi.
5. Potensi risiko terhadap integritas data dan keamanan informasi sangat tinggi.

## 7. Kesimpulan
Berdasarkan ISO/IEC 12207, pengembangan sistem UMKM Go Digital belum sepenuhnya memenuhi proses siklus hidup perangkat lunak yang sesuai untuk penggunaan dalam lingkungan operasional nyata. Sistem ini masih lebih tepat dikategorikan sebagai prototype atau MVP fungsional, bukan sistem yang siap diterapkan secara produksi tanpa perbaikan fundamental.

Status audit:
- Kelayakan: Belum layak untuk produksi
- Tingkat risiko: Tinggi hingga kritis

## 8. Rekomendasi Prioritas
1. Menyusun requirement specification dan acceptance criteria.
2. Melakukan UAT berdasarkan skenario bisnis nyata.
3. Meningkatkan keamanan autentikasi dan akses data.
4. Menyusun SOP migrasi data dengan backup, rollback, dan validasi data.
5. Menambahkan audit log dan traceability untuk perubahan data.
6. Menyusun dokumentasi manajemen konfigurasi dan pemeliharaan sistem.

## 9. Penutup
Audit ini menunjukkan bahwa pengembangan sistem masih memerlukan perbaikan pada aspek kebutuhan, pengujian, keamanan, dan migrasi data agar sesuai dengan praktik pengembangan perangkat lunak yang sehat dan dapat dipertanggungjawabkan.

Dokumen ini disusun sebagai hasil audit pengembangan sistem UMKM Go Digital berdasarkan kerangka ISO/IEC 12207.
