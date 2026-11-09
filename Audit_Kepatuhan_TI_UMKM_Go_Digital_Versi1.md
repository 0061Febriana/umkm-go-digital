# Audit Kepatuhan Teknologi Informasi
## UMKM Go Digital

Tanggal Audit: 9 November 2026
Penanggung Jawab Audit: Auditor TI / Governance, Risk & Compliance
Standar Referensi: UU PDP, prinsip tata kelola TI, COBIT 2019, praktik keamanan siber, dan standar industri terkait keamanan aplikasi dan pengelolaan data.

---

## 1. Latar Belakang

UMKM Go Digital adalah platform edukasi dan pendampingan bagi pelaku usaha mikro, kecil, dan menengah yang berfokus pada transformasi digital. Aplikasi ini memiliki beberapa fitur utama, seperti edukasi digital, kalkulator harga, dan pengelolaan konten admin. Seiring dengan perkembangan sistem, kebutuhan akan kepatuhan teknologi informasi menjadi semakin penting, terutama apabila data usaha, kontak pelanggan, atau data pribadi mulai diolah oleh platform.

Audit ini dilakukan untuk menilai tingkat kepatuhan sistem terhadap aspek keamanan informasi, perlindungan data pribadi, tata kelola TI, serta pengendalian akses yang relevan untuk lingkungan produksi.

---

## 2. Tujuan Audit

Tujuan audit ini adalah untuk:

1. menilai kesiapan sistem terhadap perlindungan data pribadi;
2. mengidentifikasi risiko keamanan aplikasi dan akses tidak sah;
3. mengevaluasi kesiapan sistem jika dikembangkan untuk layanan keuangan digital atau fungsi yang memerlukan kepatuhan sektor finansial;
4. menilai tata kelola TI dan kontrol internal;
5. mengevaluasi penggunaan software dan lisensi terkait dengan praktik industri.

---

## 3. Ruang Lingkup Audit

Ruang lingkup audit mencakup aspek berikut:

- autentikasi dan otorisasi admin;
- validasi input data dan integritas data;
- konfigurasi database dan kebijakan akses data;
- penggunaan supabase dan keamanan skema data;
- pengelolaan password dan pengendalian akses;
- audit trail dan pelacakan aktivitas sistem;
- tata kelola TI dan aspek COBIT 2019;
- kepatuhan terhadap UU Perlindungan Data Pribadi;
- kesiapan terhadap regulasi sektor keuangan (apabila aplikasi dikembangkan ke layanan finansial);
- pemanfaatan perangkat lunak dan lisensi sesuai standar industri.

---

## 4. Temuan Audit

### 4.1 Kepatuhan terhadap UU Perlindungan Data Pribadi

Berdasarkan prinsip umum UU PDP, organisasi atau pengelola sistem wajib memastikan bahwa data pribadi diproses secara sah, terbatas, aman, dan dapat dipertanggungjawabkan. Beberapa temuan yang relevan adalah:

- sistem belum memiliki mekanisme perlindungan data pribadi yang terdokumentasi secara formal;
- pengguna/admin tidak memiliki pengendalian akses yang kuat terhadap data sensitif;
- password admin dan mekanisme autentikasi masih belum memenuhi standar keamanan yang memadai;
- belum ada kebijakan retensi data, penghapusan data, atau hak subjek data yang terdokumentasi;
- belum terdapat mekanisme audit trail yang memadai untuk memonitor penggunaan data sensitif.

### Risiko

Jika sistem mulai memproses data pelanggan, kontak usaha, email, nomor telepon, foto, atau data bisnis sensitif lainnya, maka terdapat risiko pelanggaran prinsip perlindungan data pribadi. Hal ini dapat berisiko terhadap:

- kebocoran data,
- akses tidak sah,
- manipulasi data,
- reputasi organisasi,
- potensi sanksi hukum yang berlaku.

### Kesimpulan

Sistem belum cukup siap untuk dipandang mematuhi prinsip perlindungan data pribadi secara komprehensif, terutama jika data personal digunakan dalam proses operasional.

---

### 4.2 Regulasi OJK dan BI

Regulasi OJK dan BI relevan apabila sistem berkembang ke bidang layanan finansial digital, seperti:

- pembayaran digital,
- pinjaman UMKM,
- e-wallet,
- pengelolaan dana usaha,
- layanan penyaluran pembiayaan,
- pengumpulan data keuangan pelanggan.

Berdasarkan hasil evaluasi, sistem belum memiliki:

- tata kelola risiko TI formal,
- pemisahan tugas yang jelas,
- mekanisme pengendalian akses yang kuat,
- prosedur backup dan pemulihan bencana yang terdokumentasi,
- pengelolaan keamanan dan audit yang sesuai standar sektor layanan keuangan.

### Risiko

Apabila aplikasi dikembangkan menjadi layanan finansial, maka risiko operasional dan kepatuhan akan meningkat secara signifikan. Hal ini mencakup:

- risiko keamanan siber,
- risiko kebocoran data finansial,
- risiko operational failure,
- risiko tata kelola dan akuntabilitas,
- risiko non-compliance terhadap ketentuan sektor jasa keuangan.

### Kesimpulan

Sistem belum siap untuk beroperasi sebagai platform finansial digital tanpa persiapan kepatuhan yang lebih kuat.

---

### 4.3 Lisensi Software dan Kewajiban Regulasi Spesifik

Dari sisi teknologi, platform menggunakan stack umum seperti:

- Next.js
- React
- TypeScript
- Supabase

Secara umum, teknologi tersebut merupakan perangkat lunak open source yang dapat digunakan untuk pengembangan komersial. Namun, belum terdapat dokumentasi formal yang memadai mengenai:

- daftar dependency software yang digunakan,
- persetujuan lisensi setiap komponen,
- kebijakan pengelolaan lisensi pihak ketiga,
- pemantauan penggunaan software yang mungkin memiliki batas lisensi tertentu.

### Risiko

Ketiadaan inventaris lisensi dapat menimbulkan:

- penggunaan software yang tidak sesuai lisensi,
- potensi konflik hak cipta,
- masalah legal pada saat distribusi atau komersialisasi,
- ketidakjelasan tanggung jawab pengelolaan aset digital organisasi.

### Kesimpulan

Dari sisi lisensi software, proyek cenderung aman secara umum, tetapi belum ada dokumentasi kepatuhan lisensi yang formal dan terdokumentasi.

---

### 4.4 Keamanan Aplikasi dan Pengendalian Akses

Beberapa temuan utama dalam audit ini adalah:

- validasi input masih terbatas dan belum sepenuhnya dilakukan di sisi server;
- sistem tidak sepenuhnya memisahkan otorisasi admin dan proses operasional penting;
- autentikasi admin belum memenuhi standar keamanan yang kuat;
- password dan pengelolaan session belum dikelola dengan mekanisme yang aman;
- penggunaan localStorage untuk status login merupakan pendekatan yang tidak aman untuk otentikasi aplikasi produksi;
- konfigurasi database tidak sepenuhnya membatasi akses secara ketat;
- tidak semua tabel memiliki pengendalian akses yang sesuai prinsip least privilege.

### Risiko

Risiko keamanan yang muncul meliputi:

- akses tidak sah ke dashboard admin,
- manipulasi data publik dan internal,
- kebocoran data sensitif,
- pelanggaran integritas data,
- gangguan operasi aplikasi.

### Kesimpulan

Pengendalian keamanan aplikasi belum memenuhi praktik terbaik untuk sistem yang akan dijalankan dalam lingkungan produksi.

---

### 4.5 Audit Trail dan Transparansi Aktivitas

Tidak ditemukan mekanisme audit trail yang memadai untuk:

- siapa yang melakukan perubahan data,
- kapan perubahan terjadi,
- data lama dan data baru,
- siapa yang menyetujui perubahan,
- bagaimana rekonstruksi kejadian dapat dilakukan.

### Risiko

Tanpa audit log, organisasi kesulitan untuk:

- memonitor aktivitas penting,
- menganalisis penyebab insiden,
- menilai akuntabilitas,
- mendeteksi aktivitas mencurigakan,
- menyelesaikan sengketa atau laporan investigasi.

### Kesimpulan

Ketiadaan audit trail menjadi celah serius dalam tata kelola TI dan pengendalian internal.

---

### 4.6 Tata Kelola TI dan COBIT 2019

Berdasarkan evaluasi terhadap prinsip COBIT 2019, sistem masih berada pada tahap pengelolaan TI yang sangat awal. Beberapa masalah yang ditemukan adalah:

- belum ada formal governance framework yang jelas;
- belum ada pemisahan tugas yang kuat;
- belum ada risk register yang terdokumentasi;
- belum ada perencanaan DRP/BCP yang terstruktur;
- belum ada evaluasi manfaat investasi TI secara formal;
- belum ada mekanisme monitoring dan review berkala.

### Kesimpulan

Tata kelola TI belum sesuai dengan prinsip-prinsip COBIT 2019 yang menekankan akuntabilitas, pengendalian risiko, dan keberlanjutan layanan.

---

## 5. Penilaian Umum Auditor

Dari sisi kepatuhan TI, sistem UMKM Go Digital belum memenuhi standar yang layak untuk diterapkan sebagai aplikasi produksi yang memproses data sensitif atau berpotensi menyentuh layanan keuangan. Sistem ini masih lebih cocok diposisikan sebagai prototype atau aplikasi edukasi awal yang memerlukan perbaikan serius sebelum masuk ke tahap operasional penuh.

### Penilaian Risiko

- Keamanan aplikasi: Tinggi
- Perlindungan data pribadi: Tinggi
- Kesiapan regulasi OJK/BI: Belum siap jika ada fungsi finansial
- Tata kelola TI: Belum memadai
- Lisensi software: Umum aman, namun belum terdokumentasi formal

---

## 6. Kesimpulan Final

Berdasarkan hasil audit, dapat disimpulkan bahwa UMKM Go Digital belum layak dinyatakan patuh secara komprehensif terhadap aspek kepatuhan TI. Kelemahan utama terletak pada:

- autentikasi dan pengelolaan akses,
- perlindungan data pribadi,
- pengendalian data dan integritas aplikasi,
- audit trail,
- tata kelola TI dan manajemen risiko,
- kesiapan regulasi sektor keuangan,
- dokumentasi lisensi software.

Dengan demikian, status sistem saat ini dapat dikategorikan sebagai:

Status: Belum memenuhi persyaratan minimum untuk produksi yang aman dan patuh.

---

## 7. Rekomendasi Prioritas

### Prioritas 1: Keamanan dan Privasi
- Gunakan autentikasi server-side yang aman.
- Hindari penggunaan localStorage untuk status login.
- Terapkan hash password yang aman.
- Batasi akses database dengan prinsip least privilege.
- Aktifkan RLS dan pengendalian akses berbasis peran.

### Prioritas 2: Kepatuhan Data Pribadi
- buat kebijakan privasi dan notice yang jelas.
- dokumentasikan dasar hukum pemrosesan data.
- atur retensi data dan mekanisme penghapusan data.
- buat mekanisme consent bila data pelanggan diperlukan.

### Prioritas 3: Tata Kelola
- bentuk struktur peran yang jelas.
- buat risk register formal.
- buat SOP pengelolaan data dan akses.
- susun disaster recovery plan dan backup procedure.

### Prioritas 4: Kepatuhan Sektor Keuangan
- jika dikembangkan ke layanan finansial, lakukan kesiapan sesuai persyaratan OJK/BI.
- buat kontrol akuntabilitas, monitoring, dan pelaporan internal.

### Prioritas 5: Lisensi Software
- buat daftar lisensi seluruh dependency.
- lakukan audit lisensi sebelum produksi dan distribusi.
- pastikan semua komponen pihak ketiga memiliki izin penggunaan yang sah.

---

## 8. Penutup

Audit ini menunjukkan bahwa UMKM Go Digital masih membutuhkan remediasi yang signifikan sebelum dapat dianggap memenuhi tata kelola dan kepatuhan TI yang memadai. Langkah perbaikan harus dilakukan secara bertahap, terdokumentasi, dan terukur agar sistem dapat berkembang menjadi aplikasi yang aman, andal, serta patuh terhadap regulasi yang relevan.
