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
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/">Home</Link> | 
      <Link to="/cart">Cart</Link> | 
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
