export interface HasilKalkulasi {
  hargaDiskon: number;
  potonganFee: number;
  profit: number;
  margin: number;
  status: "Sangat Untung" | "Cukup" | "Tipis" | "Rugi";
  statusColor: "green" | "blue" | "yellow" | "red";
  statusEmoji: string;
}

export function hitungProfit(
  hargaModal: number,
  hargaJual: number,
  diskon: number,
  fee: number
): HasilKalkulasi {
  const hargaDiskon = hargaJual - (hargaJual * diskon) / 100;
  const potonganFee = hargaDiskon * (fee / 100);
  const profit = hargaDiskon - potonganFee - hargaModal;
  const margin = hargaModal > 0 ? (profit / hargaModal) * 100 : 0;

  let status: HasilKalkulasi["status"];
  let statusColor: HasilKalkulasi["statusColor"];
  let statusEmoji: string;

  if (margin > 30) {
    status = "Sangat Untung";
    statusColor = "green";
    statusEmoji = "✅";
  } else if (margin > 10) {
    status = "Cukup";
    statusColor = "blue";
    statusEmoji = "👍";
  } else if (margin > 0) {
    status = "Tipis";
    statusColor = "yellow";
    statusEmoji = "⚠️";
  } else {
    status = "Rugi";
    statusColor = "red";
    statusEmoji = "❌";
  }

  return { hargaDiskon, potonganFee, profit, margin, status, statusColor, statusEmoji };
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
}
