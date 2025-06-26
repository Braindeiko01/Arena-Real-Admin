const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function getPendingTransactions() {
  const res = await fetch(`${API_BASE}/transacciones/pendientes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return res.json();
}

export async function approveTransaction(id: string) {
  const res = await fetch(`${API_BASE}/transacciones/${id}/aprobar`, { method: "POST" });
  if (!res.ok) {
    throw new Error("Failed to approve transaction");
  }
  return res.json();
}

export async function getPendingMatches() {
  const res = await fetch(`${API_BASE}/partidas/pendientes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }
  return res.json();
}

export async function validateMatch(id: string) {
  const res = await fetch(`${API_BASE}/partidas/${id}/validar`, { method: "PUT" });
  if (!res.ok) {
    throw new Error("Failed to validate match");
  }
  return res.json();
}
