'use client';
import { useEffect, useState } from 'react';
import * as RadixButton from '@radix-ui/react-slot';
import { getPendingMatches, validateMatch } from '@/lib/api';

interface Match {
  id: string;
  apuestaId: string;
  modoJuego: string;
}

export default function MatchesTable() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPendingMatches()
      .then(setMatches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleValidate = async (id: string) => {
    await validateMatch(id);
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">Apuesta</th>
          <th className="border-b p-2">Modo</th>
          <th className="border-b p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((m) => (
          <tr key={m.id}>
            <td className="border-b p-2">{m.apuestaId}</td>
            <td className="border-b p-2">{m.modoJuego}</td>
            <td className="border-b p-2">
              <RadixButton.Slot
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => handleValidate(m.id)}
              >
                Validar
              </RadixButton.Slot>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
