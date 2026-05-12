"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import styles from "./adminLayout.module.css";
import Toast from "@/components/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [categories] = useState<{id: string, name: string, slug: string}[]>([
    { id: 'strategi', name: 'Strategi', slug: 'strategi' },
    { id: 'kebijakan', name: 'Kebijakan', slug: 'kebijakan' },
    { id: 'tips', name: 'Tips', slug: 'tips' }
  ]);

  useEffect(() => {
    // Sederhana pengecekan autentikasi (karena tidak pakai DB)
    const isLogged = localStorage.getItem("umkm_admin_logged");
    if (isLogged !== "true") {
      router.push("/admin-login-umkm");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("umkm_admin_logged");
    router.push("/admin-login-umkm");
  };

  // Jangan render anak-anaknya sampai dipastikan autentikasi sukses
  if (!isAuthenticated) return null;

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar Admin */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.adminLogo}>🔐 Admin<br/>UMKM Go Digital</span>
        </div>
        <nav className={styles.sidebarNav}>
          {/* Accordion Menu */}
          <div className={styles.accordion}>
            <button 
              className={`${styles.accordionHeader} ${pathname.includes('/admin-dashboard/artikel') ? styles.accordionHeaderActive : ''}`}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <span>📝 Kelola Artikel</span>
              <span className={`${styles.accordionIcon} ${isAccordionOpen ? styles.accordionIconOpen : ''}`}>▼</span>
            </button>
            <div className={`${styles.accordionContent} ${isAccordionOpen ? styles.accordionContentOpen : ''}`}>
              {categories.map((cat) => {
                const isActive = pathname === `/admin-dashboard/artikel/${cat.slug}`;
                return (
                  <Link 
                    key={cat.id} 
                    href={`/admin-dashboard/artikel/${cat.slug}`} 
                    className={isActive ? styles.navSubItemActive : styles.navSubItem}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link 
            href="/admin-dashboard/analisa-harga" 
            className={`${styles.navItem} ${pathname === '/admin-dashboard/analisa-harga' ? styles.navItemActive : ''}`}
            style={{ marginTop: '4px' }}
          >
            📊 Analisa Harga Jual
          </Link>

          <a href="/" target="_blank" className={styles.navItem} rel="noreferrer" style={{ marginTop: '8px' }}>
            🌍 Lihat Website
          </a>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.btnLogout}>
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {children}
      </main>
      <Toast />
    </div>
  );
}
