import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estúdio 1631 — Fotografia Profissional em Novo Hamburgo",
  description: "Estúdio de fotografia profissional em Novo Hamburgo. Ensaios, produtos e corporativo com equipamentos completos. Aluguel de estúdio por hora com iluminação profissional.",
  openGraph: {
    title: "Estúdio 1631 — Fotografia Profissional em Novo Hamburgo",
    description: "Estúdio de fotografia profissional em Novo Hamburgo. Ensaios, produtos e corporativo com equipamentos completos.",
    images: ['/1631%20Logo%20(3)-23.png'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Estúdio 1631',
    description: 'Estúdio de fotografia profissional em Novo Hamburgo.',
    email: 'contato@1631.studio',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida General Daltro Filho, 1631',
      addressLocality: 'Novo Hamburgo',
      addressRegion: 'RS',
      addressCountry: 'BR'
    }
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
