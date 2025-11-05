// src/api/SmartCartApi.js

const BASE_URL = "https://3984sit93b.execute-api.us-east-2.amazonaws.com";

const headers = { "Content-Type": "application/json" };

// 1️⃣ Add To Cart
export const addToCart = async (item) => {
  const response = await fetch(`${BASE_URL}/addToCart`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
  return response.json();
};

// 2️⃣ Remove From Cart
// Assuming you pass both userId and productId
export const removeFromCart = async (userId, productId) => {
  const response = await fetch(`${BASE_URL}/removeFromCart/${userId}/${productId}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};

// 3️⃣ Get Cart
// If your /getCart endpoint doesn’t require userId, this works directly:
export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/getCart`, { method: "GET" });
  return response.json();
};

// 4️⃣ Clear Cart
// You must include {userId} in your URL path
export const clearCart = async (userId) => {
  const response = await fetch(`${BASE_URL}/clearCart/${userId}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};

// 5️⃣ Search Products
export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/searchProducts?q=${query}`, {
    method: "GET",
    headers,
  });
  return response.json();
};

// 6️⃣ Compare Prices
export const comparePrices = async () => {
  const response = await fetch(`${BASE_URL}/comparePrices`, {
    method: "GET",
    headers,
  });
  return response.json();
};
