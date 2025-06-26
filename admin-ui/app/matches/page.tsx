import MatchesTable from '@/components/MatchesTable';

export default function MatchesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Partidas Pendientes</h1>
      <MatchesTable />
    </main>
  );
}
