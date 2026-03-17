import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[];
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (roles) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!roles.includes(payload.role)) {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
}