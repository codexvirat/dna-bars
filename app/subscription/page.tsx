import type { Metadata } from 'next';
import SubscriptionClient from './_client';

export const metadata: Metadata = {
  title: 'Subscription Plans',
  description: 'Subscribe to DNA Bars and save up to 22%. Choose from monthly, bi-monthly, or quarterly delivery plans. Cancel anytime.',
};

export default function SubscriptionPage() {
  return <SubscriptionClient />;
}
