// src/components/ProtectedRoute.tsx
import React from "react";
import { Redirect } from "wouter";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Redirect to="/register" />; // redirect to login/register page

  return children;
};

export default ProtectedRoute;
