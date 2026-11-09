import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { CatalogPage } from './pages/catalog/CatalogPage';
import { LoansPage } from './pages/loans/LoansPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LoginPage } from './pages/auth/LoginPage';
import './index.css';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/catalog"
        element={
          <AppLayout>
            <CatalogPage />
          </AppLayout>
        }
      />
      <Route
        path="/loans"
        element={
          <AppLayout>
            <LoansPage />
          </AppLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <AppLayout>
            <AdminInventoryPage />
          </AppLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/catalog" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
