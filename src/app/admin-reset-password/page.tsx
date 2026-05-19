"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.css";
import Link from "next/link";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !newPassword || !confirmPassword) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      // 1. Cek apakah username ada di tabel admins
      const { data: user, error: userError } = await supabase
        .from("admins")
        .select("id")
        .eq("username", username)
        .single();

      if (userError || !user) {
        setError("Username tidak ditemukan.");
        setLoading(false);
        return;
      }

      // 2. Update password
      const { error: updateError } = await supabase
        .from("admins")
        .update({ password: newPassword })
        .eq("username", username);

      if (updateError) {
        setError("Gagal mereset password. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      setSuccess("Password berhasil direset! Anda akan dialihkan ke halaman login...");
      
      // Tunggu sebentar lalu alihkan ke login
      setTimeout(() => {
        router.push("/admin-login-umkm");
      }, 2000);

    } catch {
      setError("Terjadi kesalahan sistem. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logoArea}>
            <span className={styles.lockIcon}>🔑</span>
            <h1>Reset Password</h1>
            <p>Atur ulang password admin Anda</p>
          </div>

          {error && (
            <div className={styles.errorAlert}>
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className={styles.successAlert}>
              <span>✅</span> {success}
            </div>
          )}

          <form onSubmit={handleReset} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="reset-username">Username</label>
              <input
                id="reset-username"
                type="text"
                className={styles.input}
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || !!success}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="reset-password">Password Baru</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Masukkan password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading || !!success}
                />
                <button
                  type="button"
                  className={styles.toggleKode}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  disabled={loading || !!success}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="confirm-password">Konfirmasi Password Baru</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Ketik ulang password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || !!success}
                />
                <button
                  type="button"
                  className={styles.toggleKode}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  disabled={loading || !!success}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.btnReset} ${loading ? styles.btnLoading : ""}`}
              disabled={loading || !!success}
            >
              {loading ? (
                <><span className={styles.spinner}></span> Memproses...</>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className={styles.backToLogin}>
            <Link href="/admin-login-umkm">Kembali ke halaman login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
