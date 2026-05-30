import type { Metadata, PageProps } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '../../_data/products';
import ProductDetailClient from './_client';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: `${product.tagline} – ${product.benefits.join(', ')}. Buy now or subscribe and save.`,
  };
}

export default async function ProductDetailPage(props: PageProps<'/products/[slug]'>) {
  const { slug } = await props.params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== slug);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
