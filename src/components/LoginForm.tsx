import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError(null);
    login(name.trim(), password);
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
          Welcome to Kanban Board
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: 15,
            marginBottom: 24,
            textAlign: "center",
          }}>
          Sign in to continue
        </p>
        <form
          onSubmit={handleSubmit}
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
          {error && (
            <div style={{ color: "#e11d48", fontSize: 14, marginTop: -8 }}>
              {error}
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
