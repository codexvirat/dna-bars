import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './_components/CartProvider';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DNA Bars – Premium Protein & Recovery Bars',
    template: '%s | DNA Bars',
  },
  description:
    'Scientifically formulated protein bars for performance, recovery, and wellness. Shop DNA Anabolic Bar and Collagen Glow Bar. Subscribe & save up to 22%.',
  keywords: ['protein bar', 'anabolic bar', 'collagen bar', 'recovery nutrition', 'fitness supplement', 'DNA Bars'],
  openGraph: {
    type: 'website',
    siteName: 'DNA Bars',
    title: 'DNA Bars – Premium Protein & Recovery Bars',
    description: 'Scientifically formulated protein bars for performance, recovery, and wellness.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DNA Bars – Premium Protein & Recovery Bars',
    description: 'Scientifically formulated protein bars for performance, recovery, and wellness.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '4.5rem' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
