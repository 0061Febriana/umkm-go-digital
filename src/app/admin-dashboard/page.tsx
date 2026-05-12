import { redirect } from "next/navigation";

export default function AdminDashboardIndex() {
  // Langsung redirect ke kategori default (Strategi)
  redirect("/admin-dashboard/artikel/strategi");
}
