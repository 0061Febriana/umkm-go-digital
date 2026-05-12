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

export default function TipsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories!inner(slug)")
        .eq("categories.slug", "tips")
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
      <section className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-brown">🏪 Tips Praktis</span>
          <h1>Tips Mengembangkan Toko Online</h1>
          <p>Rahasia toko UMKM yang ramai pembeli, banyak repeat order yang bisa Kamu pakai</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat tips...</p>
          ) : articles.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Belum ada artikel tips. Admin silakan tambahkan data melalui Dashboard.</p>
          ) : (
            <div className={styles.grid}>
              {articles.map((t) => (
                <div key={t.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <span className={styles.categoryBadge}>Tips</span>
                    <h3>{t.title}</h3>
                    {t.excerpt && (
                      <p className={styles.excerpt}>
                        {t.excerpt}
                      </p>
                    )}
                    <div className={styles.articleBody}>
                      {t.content}
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.date}>{new Date(t.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Link href={`/artikel/${t.slug}`} className={styles.readMore}>Baca Selengkapnya →</Link>
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
