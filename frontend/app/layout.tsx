import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from './client-layout';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductsContext';
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
  title: 'B4you produtos',
  description: 'Teste técnio aplicado pela B4you de um pequeno sistema de produtos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>
          <AuthProvider>
            <ProductProvider>{children}</ProductProvider>
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
