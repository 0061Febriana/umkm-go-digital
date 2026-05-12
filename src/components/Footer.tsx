"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>🛍️ UMKM <span>Go Digital</span></span>
          <p>Platform edukasi & tools analisis keuntungan untuk pelaku UMKM Indonesia. Bersama kita naik level! 🚀</p>
        </div>
        <div className={styles.links}>
          <h4>Menu</h4>
          <Link href="/">Home</Link>
          <Link href="/strategi">Strategi Pemasaran</Link>
          <Link href="/kebijakan">Kebijakan Marketplace</Link>
          <Link href="/tips">Tips Toko Online</Link>
          <Link href="/simulasi-harga">Simulasi Harga</Link>
        </div>
        <div className={styles.links}>
          <h4>Tools</h4>
          <Link href="/simulasi-harga">🔥 Kalkulator Profit</Link>
          <Link href="/strategi">📈 Strategi Digital</Link>
          <Link href="/kebijakan">📋 Info Marketplace</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {year} UMKM Go Digital. Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
      </div>
    </footer>
  );
}
