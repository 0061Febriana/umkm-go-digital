"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { showToast } from "@/components/Toast";
import styles from "./page.module.css";
import { formatRupiah } from "@/utils/kalkulasiProfit";

interface PriceCache {
  id: string;
  nama_produk: string;
  kategori: string;
  subkategori: string;
  marketplace: "Shopee" | "TikTok Shop";
  harga: number;
  fee_marketplace: number;
  link_produk: string;
  updated_at: string;
}

export default function AnalisaHargaAdminPage() {
  const [data, setData] = useState<PriceCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterMarketplace, setFilterMarketplace] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceCache | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    nama_produk: "",
    kategori: "Fashion",
    subkategori: "",
    marketplace: "Shopee" as "Shopee" | "TikTok Shop",
    harga: "",
    fee_marketplace: "0",
    link_produk: "",
  });

  const fetchData = async () => {
    setLoading(true);
    let query = supabase
      .from("marketplace_price_cache")
      .select("*")
      .order("updated_at", { ascending: false });

    if (filterMarketplace !== "all") {
      query = query.eq("marketplace", filterMarketplace);
    }
    if (filterCategory !== "all") {
      query = query.eq("kategori", filterCategory);
    }

    const { data: result, error } = await query;

    if (error) {
      console.error("Error fetching data:", error.message);
      showToast("Gagal memuat data analisa", "error");
    } else {
      setData(result || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMarketplace, filterCategory]);

  const filteredData = data.filter((item) =>
    item.nama_produk.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (item: PriceCache | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_produk: item.nama_produk,
        kategori: item.kategori,
        subkategori: item.subkategori,
        marketplace: item.marketplace,
        harga: String(item.harga),
        fee_marketplace: String(item.fee_marketplace),
        link_produk: item.link_produk,
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama_produk: "",
        kategori: "Fashion",
        subkategori: "",
        marketplace: "Shopee",
        harga: "",
        fee_marketplace: "0",
        link_produk: "",
      });
    }
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateLink = async (url: string, marketplace: string) => {
    try {
      const res = await fetch("/api/validate-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, marketplace }),
      });
      const result = await res.json();
      return result;
    } catch {
      return { valid: false, message: "Gagal validasi link" };
    }
  };

  const handleSave = async () => {
    const errors: Record<string, string> = {};
    if (!formData.nama_produk) errors.nama_produk = "Nama produk wajib diisi";
    if (!formData.harga || Number(formData.harga) <= 0) errors.harga = "Harga tidak valid";
    if (!formData.link_produk) errors.link_produk = "Link produk wajib diisi";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);

    // 1. Validate link format & availability
    const validation = await validateLink(formData.link_produk, formData.marketplace);
    if (!validation.valid) {
      setFormErrors({ link_produk: validation.message });
      setIsSaving(false);
      return;
    }

    // 2. Upsert to Supabase
    const payload = {
      nama_produk: formData.nama_produk,
      kategori: formData.kategori,
      subkategori: formData.subkategori,
      marketplace: formData.marketplace,
      harga: Number(formData.harga),
      fee_marketplace: Number(formData.fee_marketplace),
      link_produk: formData.link_produk,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingItem) {
      const { error: updateError } = await supabase
        .from("marketplace_price_cache")
        .update(payload)
        .eq("id", editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("marketplace_price_cache")
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      showToast("Gagal menyimpan data: " + error.message, "error");
    } else {
      showToast("Data berhasil disimpan", "success");
      setIsModalOpen(false);
      fetchData();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data ini?")) return;

    const { error } = await supabase
      .from("marketplace_price_cache")
      .delete()
      .eq("id", id);

    if (error) {
      showToast("Gagal menghapus data", "error");
    } else {
      showToast("Data dihapus", "success");
      fetchData();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Analisa Harga Jual</h1>
          <p>Data referensi harga pasar dari berbagai marketplace (Cached)</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnAdd} onClick={() => handleOpenModal()}>
            ➕ Tambah Data
          </button>
          <button className={styles.btnRefresh} onClick={fetchData}>
            🔄 Refresh
          </button>
        </div>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.select}
          value={filterMarketplace}
          onChange={(e) => setFilterMarketplace(e.target.value)}
        >
          <option value="all">Semua Marketplace</option>
          <option value="Shopee">Shopee</option>
          <option value="TikTok Shop">TikTok Shop</option>
        </select>
        <select
          className={styles.select}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          <option value="Fashion">Fashion</option>
          <option value="Makanan">Makanan</option>
          <option value="Kecantikan">Kecantikan</option>
          <option value="Elektronik">Elektronik</option>
        </select>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Marketplace</th>
                <th>Kategori / Sub</th>
                <th>Harga</th>
                <th>Fee</th>
                <th>Update</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>Memuat data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>Data tidak ditemukan.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productName}>{item.nama_produk}</div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${item.marketplace === 'Shopee' ? styles.badgeShopee : styles.badgeTikTok}`}>
                        {item.marketplace}
                      </span>
                    </td>
                    <td>
                      <div className={styles.catInfo}>
                        {item.kategori}
                        <small>{item.subkategori}</small>
                      </div>
                    </td>
                    <td><strong>{formatRupiah(item.harga)}</strong></td>
                    <td>{item.fee_marketplace}%</td>
                    <td><span className={styles.date}>{formatDate(item.updated_at)}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <a
                          href={item.link_produk}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.linkBtn}
                          title="Buka Link"
                        >
                          ↗
                        </a>
                        <button className={styles.btnEdit} onClick={() => handleOpenModal(item)} title="Edit">
                          ✏️
                        </button>
                        <button className={styles.btnDelete} onClick={() => handleDelete(item.id)} title="Hapus">
                          🗑️
                        </button>
                      </div>
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
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingItem ? "Edit Data Analisa" : "Tambah Data Analisa"}</h2>
              <button className={styles.btnClose} onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nama Produk</label>
                <input
                  type="text"
                  value={formData.nama_produk}
                  onChange={(e) => setFormData({ ...formData, nama_produk: e.target.value })}
                  placeholder="Contoh: Blouse Wanita Korea"
                />
                {formErrors.nama_produk && <div className={styles.errorMsg}>{formErrors.nama_produk}</div>}
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Kategori</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Kecantikan">Kecantikan</option>
                    <option value="Elektronik">Elektronik</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Subkategori</label>
                  <input
                    type="text"
                    value={formData.subkategori}
                    onChange={(e) => setFormData({ ...formData, subkategori: e.target.value })}
                    placeholder="Contoh: Blouse"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Marketplace</label>
                  <select
                    value={formData.marketplace}
                    onChange={(e) => setFormData({ ...formData, marketplace: e.target.value as "Shopee" | "TikTok Shop" })}
                  >
                    <option value="Shopee">Shopee</option>
                    <option value="TikTok Shop">TikTok Shop</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Harga (Rp)</label>
                  <input
                    type="number"
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    placeholder="0"
                  />
                  {formErrors.harga && <div className={styles.errorMsg}>{formErrors.harga}</div>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Fee Marketplace (%)</label>
                <input
                  type="number"
                  value={formData.fee_marketplace}
                  onChange={(e) => setFormData({ ...formData, fee_marketplace: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Link Produk</label>
                <input
                  type="text"
                  value={formData.link_produk}
                  onChange={(e) => setFormData({ ...formData, link_produk: e.target.value })}
                  placeholder="https://shopee.co.id/..."
                />
                <small style={{ color: "#666", display: "block", marginTop: 4 }}>
                  Pastikan link valid dan bisa dibuka oleh publik.
                </small>
                {formErrors.link_produk && <div className={styles.errorMsg}>{formErrors.link_produk}</div>}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Batal</button>
              <button
                className={styles.btnSave}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Validasi Link..." : "Simpan Data"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
