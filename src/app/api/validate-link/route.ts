import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, marketplace } = await request.json();

    if (!url) {
      return NextResponse.json({ valid: false, message: "URL is required" }, { status: 400 });
    }

    // Basic format validation
    if (marketplace === "Shopee") {
      if (!url.includes("shopee.co.id")) {
        return NextResponse.json({ valid: false, message: "Bukan link Shopee Indonesia" });
      }
    } else if (marketplace === "TikTok Shop") {
      if (!url.includes("tiktok.com")) {
        return NextResponse.json({ valid: false, message: "Bukan link TikTok Shop" });
      }
    }

    // HTTP Status check
    // We use a timeout to avoid hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        // Optional: Check body content for "Produk tidak ditemukan" or similar
        // But status 200 is the primary requirement
        return NextResponse.json({ valid: true, status: response.status });
      } else {
        return NextResponse.json({ valid: false, status: response.status, message: "Link tidak dapat diakses (Status: " + response.status + ")" });
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      return NextResponse.json({ valid: false, message: "Gagal menghubungi server marketplace: " + fetchError.message });
    }
  } catch (error: any) {
    return NextResponse.json({ valid: false, message: "Internal Server Error" }, { status: 500 });
  }
}
