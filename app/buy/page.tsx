import type { Metadata } from 'next';
import BuyPageClient from './_client';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse DNA Anabolic Bar and Collagen Glow Bar. Premium protein & recovery bars with 10g protein, creatine, glutamine, and ashwagandha. Subscribe and save up to 22%.',
};

export default function BuyPage() {
  return <BuyPageClient />;
}
