import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { login, register, error } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!name.trim() || !password) {
      setLocalError("Please enter both username and password.");
      return;
    }
    const normalized = name.trim().toLowerCase();
    console.log("[LoginForm] Attempting login for username:", normalized);
    login(normalized, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!name.trim() || !password) {
      setLocalError("Please enter both username and password.");
      return;
    }
    const normalized = name.trim().toLowerCase();
    const success = register(normalized, password);
    if (success) {
      console.log("[LoginForm] Registered new user:", normalized, {
        username: normalized,
        password,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(37,99,235,0.10)",
          padding: "2.5rem 2rem 2rem 2rem",
          minWidth: 340,
          maxWidth: 380,
          width: "100%",
          border: "1px solid #e0e7ef",
        }}>
        <h2
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: 26,
            marginBottom: 6,
            textAlign: "center",
          }}>
          {mode === "register"
            ? "Register for Kanban Board"
            : "Login to Kanban Board"}
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: 15,
            marginBottom: 24,
            textAlign: "center",
          }}>
          {mode === "register"
            ? "Create a new account to get started."
            : "Sign in to your account."}
        </p>
        <form
          onSubmit={mode === "register" ? handleRegister : handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="name"
              style={{ color: "#2563eb", fontWeight: 500, fontSize: 15 }}>
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "#f8fafc",
                color: "#1e293b",
                fontWeight: 500,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="password"
              style={{ color: "#2563eb", fontWeight: 500, fontSize: 15 }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "#f8fafc",
                color: "#1e293b",
                fontWeight: 500,
              }}
            />
          </div>
          {(localError || error) && (
            <div style={{ color: "#e11d48", fontSize: 14, marginTop: -8 }}>
              {localError || error}
            </div>
          )}
          <button
            type="submit"
            style={{
              padding: "12px 0",
              fontSize: 17,
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#1e40af")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}>
            {mode === "register" ? "Register" : "Login"}
          </button>
        </form>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          {mode === "register" ? (
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: 15,
              }}
              onClick={() => {
                setMode("login");
                setLocalError(null);
              }}>
              Already a user? Login here
            </button>
          ) : (
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: 15,
              }}
              onClick={() => {
                setMode("register");
                setLocalError(null);
              }}>
              New user? Register here
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
