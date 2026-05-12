import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "UMKM Go Digital – Platform Edukasi & Tools UMKM Indonesia",
  description:
    "Platform edukasi digital untuk UMKM Indonesia. Pelajari strategi pemasaran, kebijakan marketplace, tips toko online, dan gunakan simulasi optimasi harga produk Anda.",
  keywords: "UMKM, go digital, pemasaran digital, marketplace, simulasi harga, keuntungan usaha",
  openGraph: {
    title: "UMKM Go Digital",
    description: "Platform edukasi & tools analisis keuntungan untuk UMKM Indonesia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
