import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }: any) => {
  // Get authToken and userId from localStorage
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  // If there's no token or userId, redirect to login page
  if (!authToken || !userId) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the requested element (protected route)
  return element;
};

export default ProtectedRoute;