import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-4">Panel de Administración</h1>
      <ul className="flex flex-col gap-2">
        <li>
          <Link className="text-blue-600 underline" href="/transactions">
            Gestionar Transacciones
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" href="/matches">
            Gestionar Partidas
          </Link>
        </li>
      </ul>
    </main>
  );
}
