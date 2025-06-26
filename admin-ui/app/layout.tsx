import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin UI',
  description: 'Panel de administración',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-gray-900 text-white p-4">
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <Link href="/transactions" className="hover:underline">
              Transacciones
            </Link>
            <Link href="/matches" className="hover:underline">
              Partidas
            </Link>
          </nav>
        </header>
        <div className="max-w-5xl mx-auto py-6">{children}</div>
      </body>
    </html>
  );
}
