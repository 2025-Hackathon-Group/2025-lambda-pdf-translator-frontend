import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import AccountCreation from '../pages/AccountCreation';
import AccountSettings from '../pages/AccountSettings';

function AccountRouter() {
  const { user } = useAuth();

  if (user) {
    return <AccountSettings />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<AccountCreation />} />
      <Route path="/" element={<Navigate to="login" />} />
    </Routes>
  );
}

export default AccountRouter;