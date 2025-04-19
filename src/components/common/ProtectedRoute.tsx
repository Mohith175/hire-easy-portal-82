
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-bounce h-10 w-10 rounded-full bg-primary" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect based on user role if not allowed
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "EMPLOYER") {
      return <Navigate to="/employer/dashboard" replace />;
    } else if (user.role === "EMPLOYEE") {
      return <Navigate to="/employee/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Authorized - render children
  return <>{children}</>;
};

export default ProtectedRoute;
