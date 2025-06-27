'use client';
import { useEffect, useState } from 'react';
import * as RadixButton from '@radix-ui/react-slot';
import { getPendingTransactions, approveTransaction, cancelTransaction } from '@/lib/api';

interface Transaction {
  id: string;
  jugadorId: string;
  monto: number;
  tipo: string;
  estado: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPendingTransactions()
      .then(setTransactions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id: string) => {
    await approveTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCancel = async (id: string) => {
    await cancelTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">Jugador</th>
          <th className="border-b p-2">Monto</th>
          <th className="border-b p-2">Tipo</th>
          <th className="border-b p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td className="border-b p-2">{t.jugadorId}</td>
            <td className="border-b p-2">{t.monto}</td>
            <td className="border-b p-2">{t.tipo}</td>
            <td className="border-b p-2 space-x-2">
              <RadixButton.Slot
                className="bg-blue-600 text-white px-2 py-1 rounded"
                onClick={() => handleApprove(t.id)}
              >
                Aprobar
              </RadixButton.Slot>
              <RadixButton.Slot
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleCancel(t.id)}
              >
                Cancelar
              </RadixButton.Slot>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
