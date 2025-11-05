import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.brand}>SmartCart 🛒</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/search">Search</Link>
        <Link style={styles.link} to="/compare">Compare</Link>
        <Link style={styles.link} to="/cart">Cart</Link>
        {isLoggedIn ? (
          <button style={styles.button} onClick={handleLogout}>Logout</button>
        ) : (
          <Link style={styles.link} to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
  },
  brand: { fontWeight: "bold", fontSize: "1.5rem" },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    transition: "0.3s",
  },
  button: {
    background: "white",
    color: "#2563eb",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
