import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    icon: "📈",
    title: "Strategi Pemasaran Digital",
    desc: "Pelajari cara marketing produk UMKM di era digital — dari media sosial hingga SEO marketplace.",
    href: "/strategi",
    color: "#8B5E3C",
  },
  {
    icon: "📋",
    title: "Kebijakan Marketplace",
    desc: "Update regulasi terbaru dari Tokopedia, Shopee, dan marketplace populer lainnya.",
    href: "/kebijakan",
    color: "#8B5E3C",
  },
  {
    icon: "🏪",
    title: "Tips Toko Online",
    desc: "Panduan praktis mengembangkan toko online agar lebih ramai pembeli dan repeat order.",
    href: "/tips",
    color: "#8B5E3C",
  },
  {
    icon: "🔥",
    title: "Simulasi Optimasi Harga",
    desc: "Hitung profit, margin, dan status untung-rugi produkmu secara instan. Fitur unggulan!",
    href: "/simulasi-harga",
    color: "#C4956A",
    highlight: true,
  },
];

const stats = [
  { value: "10K+", label: "UMKM Terbantu" },
  { value: "50+", label: "Artikel Edukasi" },
  { value: "4", label: "Fitur Unggulan" },
  { value: "100%", label: "Gratis" },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className="badge badge-brown">🇮🇩 Platform UMKM Indonesia</span>
            <h1 className={styles.heroTitle}>
              Bantu UMKM Kamu
              <br />
              <span className={styles.heroGradient}>Go Digital</span> &amp;
              <br />
              Makin Untung!
            </h1>
            <p className={styles.heroDesc}>
              Platform edukasi lengkap untuk pelaku UMKM — strategi digital, kebijakan
              marketplace, tips toko, dan <strong>simulasi kalkulasi keuntungan produk</strong>.
            </p>
            <div className={styles.heroActions}>
              <Link href="/simulasi-harga" className="btn btn-primary btn-lg">
                🔥 Coba Simulasi Harga
              </Link>
              <Link href="/strategi" className="btn btn-outline btn-lg">
                Pelajari Strategi
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <span>💰 Kalkulator Profit</span>
              </div>
              <div className={styles.heroCardBody}>
                <div className={styles.heroCardRow}>
                  <span>Harga Modal</span>
                  <strong>Rp 50.000</strong>
                </div>
                <div className={styles.heroCardRow}>
                  <span>Harga Jual</span>
                  <strong>Rp 85.000</strong>
                </div>
                <div className={styles.heroCardRow}>
                  <span>Diskon</span>
                  <strong>10%</strong>
                </div>
                <div className={styles.heroCardRow}>
                  <span>Fee Marketplace</span>
                  <strong>5%</strong>
                </div>
                <div className={styles.heroCardDivider}></div>
                <div className={styles.heroCardResult}>
                  <span>Profit Bersih</span>
                  <strong className={styles.profitGreen}>Rp 26.325</strong>
                </div>
                <div className={styles.heroCardBadge}>✅ Sangat Untung · 52.7%</div>
              </div>
            </div>
            <div className={styles.heroFloatingBadge}>
              <span>🚀</span> UMKM Naik Level
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-brown">🎯 Fitur Lengkap</span>
            <h2>Semua yang Kamu Butuhkan</h2>
            <p>Dari edukasi digital sampai tools analisis, semuanya ada di satu platform.</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <Link key={f.href} href={f.href} className={`${styles.featureCard} ${f.highlight ? styles.featureCardHighlight : ""}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className={styles.featureArrow}>→ Lihat Selengkapnya</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <span className={styles.ctaEmoji}>💡</span>
            <h2>Cek Apakah Harga Produkmu Sudah Optimal?</h2>
            <p>Gunakan kalkulator simulasi harga kami — gratis, cepat, dan akurat!</p>
            <Link href="/simulasi-harga" className="btn btn-primary btn-lg">
              🔥 Mulai Simulasi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
