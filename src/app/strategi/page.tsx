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

export default function StrategiPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories!inner(slug)")
        .eq("categories.slug", "strategi")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-brown">📈 Edukasi Digital</span>
          <h1>Strategi Pemasaran Digital</h1>
          <p>Panduan lengkap mengembangkan usaha UMKM lewat berbagai saluran pemasaran digital yang terbukti efektif.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat strategi...</p>
          ) : articles.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Belum ada artikel strategi. Admin silakan tambahkan data melalui Dashboard.</p>
          ) : (
            <div className={styles.grid}>
              {articles.map((s) => (
                <div key={s.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <span className={styles.categoryBadge}>Strategi</span>
                    <h3>{s.title}</h3>
                    {s.excerpt && (
                      <p className={styles.excerpt}>
                        {s.excerpt}
                      </p>
                    )}
                    <div className={styles.articleBody}>
                      {s.content}
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.date}>{new Date(s.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Link href={`/artikel/${s.slug}`} className={styles.readMore}>Baca Selengkapnya →</Link>
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
