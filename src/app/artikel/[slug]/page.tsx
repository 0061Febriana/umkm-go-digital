"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";

interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
  excerpt: string;
  categories: {
    name: string;
  };
}

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, categories(name)")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="container">
          <p>Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Artikel Tidak Ditemukan</h1>
          <p>Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/" className="btn btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.articlePage}>
      <div className="container">
        <div className={styles.backNav}>
          <button onClick={() => router.back()} className={styles.backButton}>
            ← Kembali
          </button>
        </div>

        <header className={styles.articleHeader}>
          <span className={styles.categoryBadge}>{article.categories?.name}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>
              Dipublikasikan pada: {new Date(article.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>
        </header>

        {article.excerpt && (
          <div className={styles.excerpt}>
            <p>{article.excerpt}</p>
          </div>
        )}

        <div className={styles.content}>
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
        </div>

        <footer className={styles.articleFooter}>
          <div className={styles.shareBox}>
            <p>Bantu sesama pelaku UMKM dengan membagikan artikel ini!</p>
            <div className={styles.footerActions}>
              <Link href="/" className="btn btn-outline">Edukasi Lainnya</Link>
              <Link href="/simulasi-harga" className="btn btn-primary">Cek Simulasi Harga</Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
