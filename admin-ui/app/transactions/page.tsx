import TransactionsTable from '@/components/TransactionsTable';

export default function TransactionsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Transacciones Pendientes</h1>
      <TransactionsTable />
    </main>
  );
}
