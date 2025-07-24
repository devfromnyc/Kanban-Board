import React from "react";
import { useAuth } from "../contexts/AuthContext";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "Board", href: "#" },
  { label: "About", href: "#" },
];

const Header: React.FC = () => {
  const { username, isAuthenticated, logout } = useAuth();

  return (
    <nav className="header">
      <div className="nav-container">
        <div className="nav-brand">Kanban Board</div>
        <div className="nav-menu-user">
          <div className="nav-menu">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>
          {isAuthenticated && username && (
            <div className="nav-user">
              <span className="nav-username">{username}</span>
              <button className="nav-logout" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
