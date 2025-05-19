import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setIsAuthenticated(!!res.data?.user);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };
    checkUser();
  }, []);

  if (!authChecked) return null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}