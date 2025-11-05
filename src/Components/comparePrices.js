// src/components/ComparePrices.js
import React, { useState } from "react";
import { comparePrices } from "../api/SmartCartApi";

const ComparePrices = () => {
  const [products, setProducts] = useState("");
  const [comparison, setComparison] = useState(null);

  const handleCompare = async () => {
    const productList = products.split(",").map((p) => p.trim());
    const data = await comparePrices({ products: productList });
    setComparison(data);
  };

  return (
    <div>
      <h2>Compare Prices</h2>
      <input
        type="text"
        placeholder="Enter product names separated by commas"
        value={products}
        onChange={(e) => setProducts(e.target.value)}
      />
      <button onClick={handleCompare}>Compare</button>

      {comparison && (
        <pre>{JSON.stringify(comparison, null, 2)}</pre>
      )}
    </div>
  );
};

export default ComparePrices;
