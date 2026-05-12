"use client";

import { useState, useEffect } from "react";
import { hitungProfit, formatRupiah, type HasilKalkulasi } from "@/utils/kalkulasiProfit";
import { productCategories } from "@/utils/categories-data";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";


export default function SimulasiHargaPage() {
  const [hargaModal, setHargaModal] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [diskon, setDiskon] = useState("");
  const [fee, setFee] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [hasil, setHasil] = useState<HasilKalkulasi | null>(null);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCategory = productCategories.find(c => c.id === category);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!hargaModal || Number(hargaModal) <= 0) e.hargaModal = "Harga modal wajib diisi";
    if (!hargaJual || Number(hargaJual) <= 0) e.hargaJual = "Harga jual wajib diisi";
    if (diskon !== "" && (Number(diskon) < 0 || Number(diskon) > 100)) e.diskon = "Diskon antara 0–100%";
    if (fee !== "" && (Number(fee) < 0 || Number(fee) > 100)) e.fee = "Fee antara 0–100%";
    return e;
  };

  const handleHitung = async () => {
    const e = validate();
    if (!category) e.category = "Pilih kategori produk";
    if (!subCategory) e.subCategory = "Pilih subkategori";

    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    
    // Fetch cached marketplace data
    const { data: marketResults } = await supabase
      .from("marketplace_price_cache")
      .select("*")
      .eq("kategori", category)
      .eq("subkategori", subCategory);

    setMarketData(marketResults || []);

    const result = hitungProfit(
      Number(hargaModal),
      Number(hargaJual),
      Number(diskon) || 0,
      Number(fee) || 0
    );
    setHasil(result);
    setLoading(false);
  };

  const handleReset = () => {
    setHargaModal("");
    setHargaJual("");
    setDiskon("");
    setFee("");
    setHasil(null);
    setErrors({});
  };


  const statusColorMap = {
    green: { bg: "#E8F5E9", border: "#4CAF50", text: "#2E7D32" },
    blue: { bg: "#E3F2FD", border: "#2196F3", text: "#1565C0" },
    yellow: { bg: "#FFF3E0", border: "#FF9800", text: "#E65100" },
    red: { bg: "#FFEBEE", border: "#F44336", text: "#C62828" },
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <span className="badge badge-brown">🔥 Fitur Unggulan</span>
          <h1>Simulasi Optimasi Harga &amp; Untung</h1>
          <p>Input data produkmu dan sistem akan menghitung profit bersih, margin, serta status untung-rugi secara otomatis.</p>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.layout}>
            {/* LEFT: FORM */}
            <div className={styles.formWrapper}>

              {/* Form */}
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>📥 Input Data Produk</h2>

                {/* Kategori & Subkategori */}
                <div className={styles.rowGroup}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kategori Produk</label>
                    <select 
                      className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubCategory("");
                      }}
                    >
                      <option value="">Pilih Kategori</option>
                      {productCategories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.category && <span className={styles.errorMsg}>{errors.category}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Subkategori</label>
                    <select 
                      className={`${styles.select} ${errors.subCategory ? styles.inputError : ""}`}
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      disabled={!category}
                    >
                      <option value="">Pilih Subkategori</option>
                      {selectedCategory?.subcategories.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    {errors.subCategory && <span className={styles.errorMsg}>{errors.subCategory}</span>}
                  </div>
                </div>

                {/* Harga Modal */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="harga-modal">Harga Modal (Rp)</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.prefix}>Rp</span>
                    <input
                      id="harga-modal"
                      type="number"
                      className={`${styles.input} ${errors.hargaModal ? styles.inputError : ""}`}
                      placeholder="Contoh: 50000"
                      value={hargaModal}
                      onChange={(e) => setHargaModal(e.target.value)}
                      min="0"
                    />
                  </div>
                  {errors.hargaModal && <span className={styles.errorMsg}>{errors.hargaModal}</span>}
                </div>

                {/* Harga Jual */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="harga-jual">Harga Jual (Rp)</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.prefix}>Rp</span>
                    <input
                      id="harga-jual"
                      type="number"
                      className={`${styles.input} ${errors.hargaJual ? styles.inputError : ""}`}
                      placeholder="Contoh: 85000"
                      value={hargaJual}
                      onChange={(e) => setHargaJual(e.target.value)}
                      min="0"
                    />
                  </div>
                  {errors.hargaJual && <span className={styles.errorMsg}>{errors.hargaJual}</span>}
                </div>

                {/* Diskon & Fee row */}
                <div className={styles.rowGroup}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="diskon">Diskon (%)</label>
                    <div className={styles.inputWrapper}>
                      <input
                        id="diskon"
                        type="number"
                        className={`${styles.input} ${errors.diskon ? styles.inputError : ""}`}
                        placeholder="0"
                        value={diskon}
                        onChange={(e) => setDiskon(e.target.value)}
                        min="0"
                        max="100"
                      />
                      <span className={styles.suffix}>%</span>
                    </div>
                    {errors.diskon && <span className={styles.errorMsg}>{errors.diskon}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="fee-marketplace">Fee Marketplace (%)</label>
                    <div className={styles.inputWrapper}>
                      <input
                        id="fee-marketplace"
                        type="number"
                        className={`${styles.input} ${errors.fee ? styles.inputError : ""}`}
                        placeholder="0"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        min="0"
                        max="100"
                      />
                      <span className={styles.suffix}>%</span>
                    </div>
                    {errors.fee && <span className={styles.errorMsg}>{errors.fee}</span>}
                  </div>
                </div>

                {/* Buttons */}
                <div className={styles.btnRow}>
                  <button
                    id="btn-hitung"
                    className={`${styles.btnHitung} ${loading ? styles.btnLoading : ""}`}
                    onClick={handleHitung}
                    disabled={loading}
                    type="button"
                  >
                    {loading ? (
                      <><span className={styles.spinner}></span> Menghitung...</>
                    ) : (
                      <>🔍 Hitung Profit</>
                    )}
                  </button>
                  <button
                    id="btn-reset"
                    className={styles.btnReset}
                    onClick={handleReset}
                    type="button"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: RESULT */}
            <div className={styles.resultWrapper}>
              {!hasil ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🧮</div>
                  <h3>Belum ada hasil</h3>
                  <p>Isi data produk di sebelah kiri, lalu klik tombol <strong>&quot;Hitung Profit&quot;</strong> untuk melihat analisis keuntungan.</p>
                </div>
              ) : (
                <div className={styles.result} style={{ animation: "fadeInUp 0.5s ease forwards" }}>
                  {/* Status Banner */}
                  <div
                    className={styles.statusBanner}
                    style={{
                      background: statusColorMap[hasil.statusColor].bg,
                      borderColor: statusColorMap[hasil.statusColor].border,
                      color: statusColorMap[hasil.statusColor].text,
                    }}
                  >
                    <span className={styles.statusEmoji}>{hasil.statusEmoji}</span>
                    <div>
                      <div className={styles.statusLabel}>Status Keuntungan</div>
                      <div className={styles.statusValue}>{hasil.status}</div>
                    </div>
                    <div className={styles.statusMargin}>
                      <div className={styles.marginValue}>{hasil.margin.toFixed(1)}%</div>
                      <div className={styles.marginLabel}>Margin</div>
                    </div>
                  </div>

                  {/* Profit Bersih (Primary Highlight) */}
                  <div className={styles.profitHighlight} style={{ color: statusColorMap[hasil.statusColor].text }}>
                    <div className={styles.profitLabel}>💰 Profit Bersih Estimasi</div>
                    <div className={styles.profitValue}>{formatRupiah(hasil.profit)}</div>
                  </div>

                  {/* Detail Grid */}
                  <div className={styles.detailGrid}>
                    <div className={styles.detailCard}>
                      <span className={styles.detailIcon}>🏷️</span>
                      <span className={styles.detailLabel}>Harga Setelah Diskon</span>
                      <span className={styles.detailValue}>{formatRupiah(hasil.hargaDiskon)}</span>
                    </div>
                    <div className={styles.detailCard}>
                      <span className={styles.detailIcon}>💸</span>
                      <span className={styles.detailLabel}>Potongan Fee</span>
                      <span className={`${styles.detailValue} ${styles.valueMinus}`}>{formatRupiah(hasil.potonganFee)}</span>
                    </div>
                  </div>

                  {/* Marketplace Comparison */}
                  {marketData.length > 0 && (
                    <div className={styles.marketComparison}>
                      <h4>🏪 Perbandingan Harga Pasar ({subCategory})</h4>
                      <div className={styles.marketGrid}>
                        {marketData.map((item, idx) => (
                          <div key={idx} className={styles.marketCard}>
                            <div className={styles.marketHeader}>
                              <span className={item.marketplace === 'Shopee' ? styles.badgeShopee : styles.badgeTikTok}>
                                {item.marketplace}
                              </span>
                              <span className={styles.marketPrice}>{formatRupiah(item.harga)}</span>
                            </div>
                            <p className={styles.marketProduct}>{item.nama_produk}</p>
                            {item.link_produk && item.link_produk !== "#" ? (
                              <a href={item.link_produk} target="_blank" rel="noreferrer" className={styles.marketLink}>
                                Lihat Produk ↗
                              </a>
                            ) : (
                              <span className={styles.linkInvalid}>Produk tidak tersedia</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Margin Bar */}
                  <div className={styles.marginBar}>
                    <div className={styles.marginBarHeader}>
                      <span>Visualisasi Margin</span>
                      <strong>{hasil.margin.toFixed(1)}%</strong>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${Math.min(Math.max(hasil.margin, 0), 100)}%`,
                          background: statusColorMap[hasil.statusColor].border,
                        }}
                      ></div>
                    </div>
                    <div className={styles.barLabels}>
                      <span>Rugi ({"<"}0%)</span>
                      <span>Tipis (1-10%)</span>
                      <span>Cukup (10-30%)</span>
                      <span>Sangat Untung ({">"}30%)</span>
                    </div>
                  </div>

                  {/* Rekomendasi */}
                  <div className={styles.rekomendasiBox}>
                    <h4>💡 Rekomendasi Analisa</h4>
                    
                    {/* Market Comparison Logic */}
                    {marketData.length > 0 && (
                      <div className={styles.marketAnalysis}>
                        {(() => {
                          const avgPrice = marketData.reduce((acc, curr) => acc + curr.harga, 0) / marketData.length;
                          const userPrice = Number(hargaJual);
                          const diff = userPrice - avgPrice;
                          const diffPercent = (diff / avgPrice) * 100;

                          if (diff > 0 && diffPercent > 15) {
                            return <p className={styles.warningText}>⚠️ Harga Anda <strong>{formatRupiah(diff)} ({diffPercent.toFixed(1)}%) lebih mahal</strong> dari rata-rata pasar. Pertimbangkan untuk menurunkan harga agar lebih kompetitif.</p>;
                          } else if (diff < 0) {
                            return <p className={styles.successText}>✅ Harga Anda sangat kompetitif! Lebih murah <strong>{formatRupiah(Math.abs(diff))}</strong> dari rata-rata pasar.</p>;
                          } else {
                            return <p>Harga Anda sudah berada di kisaran rata-rata pasar. Fokus pada kualitas layanan dan kecepatan pengiriman.</p>;
                          }
                        })()}
                      </div>
                    )}

                    <div className={styles.dividerSmall}></div>

                    {hasil.status === "Sangat Untung" && (
                      <p>Margin kamu sangat bagus! Pertahankan struktur harga ini. Kamu bisa pertimbangkan investasi di iklan untuk meningkatkan volume penjualan.</p>
                    )}
                    {hasil.status === "Cukup" && (
                      <p>Margin cukup sehat. Coba cari cara mengurangi harga modal atau naikkan harga jual sedikit untuk meningkatkan margin ke {">"} 30%.</p>
                    )}
                    {hasil.status === "Tipis" && (
                      <p>Margin tipis, perlu perhatian! Evaluasi harga modal — apakah bisa negosiasi supplier? Atau naikkan harga jual 5-10%.</p>
                    )}
                    {hasil.status === "Rugi" && (
                      <p>⚠️ Harga ini menyebabkan kerugian! Segera perbaiki harga jual atau kurangi diskon. Jangan lanjutkan berjualan dengan harga ini.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Formula Section */}
          <div className={styles.formulaSection}>
            <h3>⚙️ Rumus Perhitungan</h3>
            <div className={styles.formulaGrid}>
              <div className={styles.formulaCard}>
                <div className={styles.formulaStep}>1</div>
                <div>
                  <div className={styles.formulaTitle}>Harga Setelah Diskon</div>
                  <code>Harga Jual − (Harga Jual × Diskon%)</code>
                </div>
              </div>
              <div className={styles.formulaCard}>
                <div className={styles.formulaStep}>2</div>
                <div>
                  <div className={styles.formulaTitle}>Potongan Fee</div>
                  <code>Harga Setelah Diskon × Fee%</code>
                </div>
              </div>
              <div className={styles.formulaCard}>
                <div className={styles.formulaStep}>3</div>
                <div>
                  <div className={styles.formulaTitle}>Profit Bersih</div>
                  <code>Harga Diskon − Fee − Harga Modal</code>
                </div>
              </div>
              <div className={styles.formulaCard}>
                <div className={styles.formulaStep}>4</div>
                <div>
                  <div className={styles.formulaTitle}>Margin (%)</div>
                  <code>(Profit ÷ Harga Modal) × 100</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
