export async function searchProducts(query) {
  // Simulating API call with dummy data
  return [
    { id: 1, name: `${query} from Amazon`, price: 100, source: "Amazon" },
    { id: 2, name: `${query} from Walmart`, price: 95, source: "Walmart" },
    { id: 3, name: `${query} from eBay`, price: 98, source: "eBay" },
  ];
}

export async function getCart() {
  return [
    { id: 1, name: "Laptop from Amazon", price: 100 },
    { id: 2, name: "Laptop from Walmart", price: 95 },
  ];
}

export async function addToCart(product) {
  console.log("Added to cart:", product);
}
