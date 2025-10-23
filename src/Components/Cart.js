import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../api/mockApi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      async function fetchCart() {
        const items = await getCart();
        setCart(items);
      }
      fetchCart();
    }
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}
