"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      // Cek ke tabel admins di Supabase
      const { data, error: dbError } = await supabase
        .from("admins")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (dbError || !data) {
        setError("Username atau password salah. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // Jika berhasil
      localStorage.setItem("umkm_admin_logged", "true");
      router.push("/admin-dashboard");
    } catch (err) {
      setError("Terjadi kesalahan sistem. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logoArea}>
            <span className={styles.lockIcon}>🔐</span>
            <h1>Admin Panel</h1>
            <p>UMKM Go Digital — Akses Terbatas</p>
          </div>

          {/* Alert */}
          {error && (
            <div className={styles.errorAlert}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                className={styles.input}
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="admin-password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.toggleKode}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div className={styles.forgotPassword}>
                <a href="/admin-reset-password">Lupa Password?</a>
              </div>
            </div>

            <button
              id="btn-admin-login"
              type="submit"
              className={`${styles.btnLogin} ${loading ? styles.btnLoading : ""}`}
              disabled={loading}
            >
              {loading ? (
                <><span className={styles.spinner}></span> Memverifikasi...</>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          <p className={styles.hint}>
            Halaman ini hanya untuk administrator. Pengguna biasa tidak perlu login.
          </p>
        </div>
      </div>
    </div>
  );
}
