import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (name?: string, email?: string) => void;
  logout: () => void;
  userName: string;
  userEmail: string;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userName: "",
  userEmail: "",
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedName = localStorage.getItem("userName") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";

    setIsLoggedIn(storedLoggedIn);
    setUserName(storedName);
    setUserEmail(storedEmail);
  }, []);

  const login = (name?: string, email?: string) => {
    setIsLoggedIn(true);
    setUserName(name || "");
    setUserEmail(email || "");

    localStorage.setItem("isLoggedIn", "true");
    if (name) localStorage.setItem("userName", name);
    if (email) localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userName, userEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
