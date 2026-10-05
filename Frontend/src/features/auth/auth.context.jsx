import { createContext, useState, useEffect } from "react";
import { login, register, getMe, logout } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function initAuth() {
      try {
        const data = await getMe();
        if (isMounted && data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        // User is unauthenticated, which is normal for first load
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogin({ email, password, username }) {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await login({ email, password, username });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      return { success: true };
    } catch (err) {
      setUser(null);
      return { success: true };
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        authError,
        setAuthError,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};