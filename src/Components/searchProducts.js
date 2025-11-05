import React, { useState } from "react";
import { searchProducts, addToCart } from "../api/SmartCartApi";

const SearchProducts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchProducts(query);
      setResults(data.products || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch products. Please check your connection or AWS API settings.");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="search-container">
      <h2>Search Products</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul>
        {results.length > 0 ? (
          results.map((product) => (
            <li key={product.id || product.name}>
              {product.name} — ${product.price}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

// ✅ This must match the component name above
export default SearchProducts;
