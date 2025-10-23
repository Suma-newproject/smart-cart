import { useState } from "react";
import { searchProducts, addToCart } from "../api/mockApi";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const products = await searchProducts(query);
    setResults(products);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Products</h2>
      <input
        type="text"
        placeholder="Enter product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {results.map((p) => (
          <div key={p.id} style={{ marginBottom: "10px" }}>
            <b>{p.name}</b> - ${p.price} ({p.source})
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
