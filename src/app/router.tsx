import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { AdminLayout } from '../components/layout/AdminLayout';
import { UserLayout } from '../components/layout/UserLayout';

// Auth page
import { LoginPage } from '../pages/auth/LoginPage';

// Admin pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminCatalogPage } from '../pages/admin/AdminCatalogPage';
import { AdminNewBookPage } from '../pages/admin/AdminNewBookPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminLoansPage } from '../pages/admin/AdminLoansPage';
import { AdminNewLoanPage } from '../pages/admin/AdminNewLoanPage';
import { LoanSuccessPage } from '../pages/admin/LoanSuccessPage';
import { AdminReturnsPage } from '../pages/admin/AdminReturnsPage';
import { AdminReturnConfirmationPlaceholderPage } from '../pages/admin/AdminReturnConfirmationPlaceholderPage';
import { ReturnSuccessPage } from '../pages/admin/ReturnSuccessPage';
import { AdminSmartSearchPage } from '../pages/admin/AdminSmartSearchPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
import { AdminProfilePage } from '../pages/admin/AdminProfilePage';
import { SearchPage } from '../pages/search/SearchPage';

// User pages
import { UserHomePage } from '../pages/user/UserHomePage';
import { UserCatalogPage } from '../pages/user/UserCatalogPage';
import { UserBookDetailPage } from '../pages/user/UserBookDetailPage';
import { UserRequestsPage } from '../pages/user/UserRequestsPage';
import { UserRequestDetailPage } from '../pages/user/UserRequestDetailPage';
import { UserLoansPage } from '../pages/user/UserLoansPage';
import { UserProfilePage } from '../pages/user/UserProfilePage';

// Error page
import { NotFoundPage } from '../pages/errors/NotFoundPage';

const RootRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.kind === 'ADMINISTRATIVE') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/user/home" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: 'catalog',
        element: <AdminCatalogPage />,
      },
      {
        path: 'catalog/new',
        element: <AdminNewBookPage />,
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'loans',
        element: <AdminLoansPage />,
      },
      {
        path: 'loans/new',
        element: <AdminNewLoanPage />,
      },
      {
        path: 'loans/:loanId/success',
        element: <LoanSuccessPage />,
      },
      {
        path: 'returns',
        element: <AdminReturnsPage />,
      },
      {
        path: 'returns/:loanId',
        element: <AdminReturnConfirmationPlaceholderPage />,
      },
      {
        path: 'returns/:loanId/success',
        element: <ReturnSuccessPage />,
      },
      {
        path: 'search',
        element: <AdminSmartSearchPage />,
      },
      {
        path: 'reports',
        element: <AdminReportsPage />,
      },
      {
        path: 'profile',
        element: <AdminProfilePage />,
      },
    ],
  },
  {
    path: '/search',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/user/home" replace />,
      },
      {
        path: 'home',
        element: <UserHomePage />,
      },
      {
        path: 'catalog',
        element: <UserCatalogPage />,
      },
      {
        path: 'catalog/:bookId',
        element: <UserBookDetailPage />,
      },
      {
        path: 'requests',
        element: <UserRequestsPage />,
      },
      {
        path: 'requests/:requestId',
        element: <UserRequestDetailPage />,
      },
      {
        path: 'loans',
        element: <UserLoansPage />,
      },
      {
        path: 'profile',
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
