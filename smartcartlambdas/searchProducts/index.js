exports.handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : {};
  const q = body.query || body.q || "test product";
  const results = [
    { id: "a1", name: `${q} - Amazon`, price: 100, source: "Amazon", link: "#" },
    { id: "w1", name: `${q} - Walmart`, price: 95, source: "Walmart", link: "#" },
    { id: "e1", name: `${q} - eBay`, price: 98, source: "eBay", link: "#" }
  ];
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(results)
  };
};
// This Lambda function simulates a product search across multiple sources