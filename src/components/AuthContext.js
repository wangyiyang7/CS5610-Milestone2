import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAccountId = localStorage.getItem("accountId");
    if (token && storedAccountId) {
      setIsAuthenticated(true);
      setAccountId(storedAccountId);
    }
  }, []);

  const login = (token, accountId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("accountId", accountId);
    setIsAuthenticated(true);
    setAccountId(accountId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
    setIsAuthenticated(false);
    setAccountId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};