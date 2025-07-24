import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "kanban_users";
const CURRENT_USER_KEY = "kanban_current_user";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      setUsername(stored);
    }
  }, []);

  // Persist current user to localStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem(CURRENT_USER_KEY, username);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [username]);

  // Always normalize username
  const normalize = (u: string) => u.trim().toLowerCase();

  // Get users array from localStorage
  const getUsers = (): Array<{ username: string; password: string }> => {
    const usersRaw = localStorage.getItem(USERS_KEY);
    if (usersRaw) {
      try {
        const parsed = JSON.parse(usersRaw);
        if (Array.isArray(parsed)) {
          return parsed;
        } else if (typeof parsed === "object" && parsed !== null) {
          // Migrate old object format to array
          const arr = Object.entries(parsed).map(([username, password]) => ({
            username,
            password: String(password),
          }));
          localStorage.setItem(USERS_KEY, JSON.stringify(arr));
          return arr;
        }
      } catch {}
    }
    return [];
  };

  // Save users array to localStorage
  const saveUsers = (users: Array<{ username: string; password: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = (usernameInput: string, password: string) => {
    setError(null);
    const uname = normalize(usernameInput);
    const users = getUsers();
    const found = users.find((u) => u.username === uname);
    if (found && found.password === password) {
      setUsername(uname);
      setError(null);
      return true;
    } else {
      setError("Incorrect username or password.");
      return false;
    }
  };

  const register = (usernameInput: string, password: string) => {
    setError(null);
    const uname = normalize(usernameInput);
    let users = getUsers();
    if (users.find((u) => u.username === uname)) {
      setError("User already exists. Please login.");
      return false;
    }
    users.push({ username: uname, password });
    saveUsers(users);
    setUsername(uname);
    setError(null);
    return true;
  };

  const logout = () => {
    setUsername(null);
    setError(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const isAuthenticated = !!username;

  const value: AuthContextType = {
    username,
    login,
    register,
    logout,
    isAuthenticated,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
