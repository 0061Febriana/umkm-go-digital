"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  created_at: string;
}

export default function KebijakanPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories!inner(slug)")
        .eq("categories.slug", "kebijakan")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
  };

  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-brown">📋 Update Terbaru</span>
          <h1>Kebijakan Marketplace</h1>
          <p>Pantau terus perubahan aturan dari berbagai marketplace agar toko kamu tetap aman dan berkembang.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat kebijakan...</p>
          ) : articles.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Belum ada artikel kebijakan. Admin silakan tambahkan data melalui Dashboard.</p>
          ) : (
            <div className={styles.grid}>
              {articles.map((p) => (
                <div key={p.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.categoryBadge}>Kebijakan</span>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span className={`${styles.tag} ${styles.tagYellow}`}>Update</span>
                      </div>
                    </div>
                    <h3>{p.title}</h3>
                    {p.excerpt && (
                      <p className={styles.excerpt}>
                        {p.excerpt}
                      </p>
                    )}
                    <div className={styles.articleBody}>
                      {p.content}
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.date}>{formatDate(p.created_at)}</span>
                      <Link href={`/artikel/${p.slug}`} className={styles.readMore}>Baca Selengkapnya →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
