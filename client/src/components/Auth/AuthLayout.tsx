// components/AuthLayout.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authentication = true }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.authenticate);

  if (authentication && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthLayout;
