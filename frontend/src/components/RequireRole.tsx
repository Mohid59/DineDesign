import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Role = "admin" | "client";

const RequireRole = ({ allowed, children }: { allowed: Role[]; children: JSX.Element }) => {
  const { role, user } = useAuth();
  const location = useLocation();

  if (!user || !role) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  if (!allowed.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
};

export default RequireRole;

