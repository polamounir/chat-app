import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../app/slices/authSlice";
import Cookies from "js-cookie";

export default function AppInit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  

  useEffect(() => {
    const initializeApp = async () => {
      if (isInitialized) return;

      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (!accessToken || !refreshToken) {
        // navigate("/login");
        return;
      }

      try {
        await dispatch(fetchUserInfo()).unwrap();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        // navigate("/login");
      }
    };

    initializeApp();
  }, [dispatch, navigate, isInitialized]);

  // Handle authentication state changes
  useEffect(() => {
    if (isInitialized && !loading) {
      if (!isAuthenticated) {
        // navigate("/login");
      }
    }
  }, [isAuthenticated, loading, isInitialized, navigate]);

  return null;
}
