"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import { showToast } from "@/components/Toast";
import styles from "./page.module.css";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category_id: string;
  content: string;
  status: "draft" | "published";
  created_at: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryArticlesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published">("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "published"
  });

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: !editMode ? generateSlug(newTitle) : prev.slug
    }));
  };

  // Load category details
  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching category:", error.message);
        showToast("Kategori tidak ditemukan", "error");
      } else {
        setCategory(data);
      }
    };
    fetchCategory();
  }, [slug]);

  // Load articles
  const fetchArticles = async () => {
    if (!category) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("category_id", category.id)
      .order("created_at", { ascending: false });
  
    if (error) {
      console.error("Error fetching articles:", error.message);
      showToast("Gagal memuat artikel", "error");
    } else {
      setAllArticles(data || []);
    }
    setLoading(false);
  };
  
  const counts = {
    all: allArticles.length,
    draft: allArticles.filter(a => a.status === 'draft').length,
    published: allArticles.filter(a => a.status === 'published').length
  };
  
  const articlesToDisplay = allArticles.filter(a => {
    if (activeTab === 'all') return true;
    return a.status === activeTab;
  });

  useEffect(() => {
    if (category) {
      fetchArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditMode(true);
      setFormData({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content,
        status: article.status,
      });
    } else {
      setEditMode(false);
      setFormData({ 
        title: "", 
        slug: "",
        excerpt: "",
        content: "",
        status: "published" 
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (e: React.FormEvent, statusToSave: "draft" | "published") => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showToast("Judul dan Konten harus diisi!", "error");
      return;
    }

    if (!category) return;

    if (editMode && formData.id) {
      const { error } = await supabase
        .from("articles")
        .update({
          title: formData.title,
          slug: formData.slug || generateSlug(formData.title),
          excerpt: formData.excerpt || null,
          content: formData.content,
          status: statusToSave,
          updated_at: new Date().toISOString()
        })
        .eq("id", formData.id);

      if (error) {
        console.error("Error updating:", error.message);
        showToast("Gagal menyimpan artikel: " + error.message, "error");
      } else {
        showToast(statusToSave === "draft" ? "Draft berhasil disimpan" : "Artikel berhasil dipublikasikan", "success");
      }
    } else {
      const { error } = await supabase
        .from("articles")
        .insert([{
          title: formData.title,
          slug: formData.slug || generateSlug(formData.title),
          excerpt: formData.excerpt || null,
          category_id: category.id,
          content: formData.content,
          status: statusToSave
        }]);
      
      if (error) {
        console.error("Error creating:", error.message);
        showToast("Gagal menambahkan artikel: " + error.message, "error");
      } else {
        showToast(statusToSave === "draft" ? "Draft berhasil disimpan" : "Artikel berhasil dipublikasikan", "success");
      }
    }
    
    closeModal();
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);
        
      if (error) {
        console.error("Error deleting:", error.message);
        showToast("Gagal menghapus artikel", "error");
      } else {
        showToast("Artikel berhasil dihapus", "success");
        fetchArticles();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  if (!category && !loading) {
    return <div className={styles.emptyState}>Kategori tidak ditemukan.</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1>Kategori: {category ? category.name : "Memuat..."}</h1>
          <p>Kelola artikel dan draft khusus untuk kategori {category?.name}</p>
        </div>
        <button className={styles.btnAdd} onClick={() => handleOpenModal()} disabled={!category}>
          + Tambah Artikel {category?.name}
        </button>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Semua <span className={styles.countBadge}>{counts.all}</span>
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "draft" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("draft")}
        >
          Draft <span className={styles.countBadge}>{counts.draft}</span>
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "published" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("published")}
        >
          Published <span className={styles.countBadge}>{counts.published}</span>
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Judul Artikel</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th className={styles.textRight}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    Memuat data...
                  </td>
                </tr>
              ) : articlesToDisplay.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    Belum ada artikel {activeTab !== "all" ? activeTab : ""} di kategori ini.
                  </td>
                </tr>
              ) : (
                articlesToDisplay.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.title}</strong></td>
                    <td>
                      <span className={`${styles.badge} ${a.status === 'draft' ? styles.badgeDraft : styles.badgePublished}`}>
                        {a.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td>{formatDate(a.created_at)}</td>
                    <td className={styles.textRight}>
                      <button className={styles.btnActionEdit} onClick={() => handleOpenModal(a)}>Edit</button>
                      <button className={styles.btnActionDelete} onClick={() => handleDelete(a.id)}>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editMode ? "Edit Artikel" : `Tambah Artikel ${category?.name}`}</h2>
              <button className={styles.btnClose} onClick={closeModal}>&times;</button>
            </div>
            <form style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="Contoh: Cara Meningkatkan Rating Toko"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Slug URL (Otomatis)</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="contoh-judul-artikel"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Ringkasan Pendek (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Ringkasan 1-2 kalimat untuk tampil di card..."
                  ></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Konten Artikel</label>
                  <textarea
                    required
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Tulis isi artikel di sini..."
                  ></textarea>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={closeModal}>Batal</button>
                <button 
                  type="button" 
                  className={styles.btnDraft} 
                  onClick={(e) => handleSave(e, "draft")}
                >
                  Simpan Draft
                </button>
                <button 
                  type="button" 
                  className={styles.btnSave} 
                  onClick={(e) => handleSave(e, "published")}
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
