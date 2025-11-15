// 🏠 Página Principal del Panel Administrativo
import AuthGuard from '@/components/admin/AuthGuard';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
}