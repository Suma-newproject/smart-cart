import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../api/SmartCartApi";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "demoUser"; // Replace this with your real user ID or auth value later

  // Load cart on first render
  useEffect(() => {
    loadCart();
  }, []);

  // Function to load cart items from AWS API
  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
      alert("Failed to fetch cart data. Please check your AWS setup or CORS settings.");
    } finally {
      setLoading(false);
    }
  };

  // Function to remove an item from cart
  const handleRemove = async (productId) => {
    try {
      await removeFromCart(userId, productId);
      loadCart(); // reload after removing
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  // Function to clear the cart
  const handleClear = async () => {
    try {
      await clearCart(userId);
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart.");
    }
  };

  // UI rendering
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {loading ? (
        <p>Loading your cart...</p>
      ) : cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} — ${item.price}
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleClear} disabled={cart.length === 0}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
