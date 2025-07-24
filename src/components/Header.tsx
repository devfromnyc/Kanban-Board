import React from "react";
import { useAuth } from "../contexts/AuthContext";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "Board", href: "#" },
  { label: "About", href: "#" },
];

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
          {user && (
            <div className="nav-user">
              <span className="nav-username">{user.name}</span>
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
