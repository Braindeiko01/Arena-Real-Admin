// Default to local backend during development if no env variable is provided
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

export async function getPendingTransactions() {
  const res = await fetch(`${API_BASE}/transacciones/pendientes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }
  return res.json();
}

export async function approveTransaction(id: string) {
  const res = await fetch(`${API_BASE}/transacciones/${id}/aprobar`, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Failed to approve transaction: ${res.status}`);
  }
  return res.json();
}

export async function cancelTransaction(id: string) {
  const res = await fetch(`${API_BASE}/transacciones/${id}/cancelar`, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Failed to cancel transaction: ${res.status}`);
  }
  return res.json();
}

export async function getPendingMatches() {
  const res = await fetch(`${API_BASE}/partidas/pendientes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch matches: ${res.status}`);
  }
  return res.json();
}

export async function validateMatch(id: string) {
  const res = await fetch(`${API_BASE}/partidas/${id}/validar`, { method: "PUT" });
  if (!res.ok) {
    throw new Error(`Failed to validate match: ${res.status}`);
  }
  return res.json();
}
