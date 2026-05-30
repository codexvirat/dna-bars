import type { Metadata } from 'next';
import AdminDashboardClient from './_client';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminPage() {
  return <AdminDashboardClient />;
}
