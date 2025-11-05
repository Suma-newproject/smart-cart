const axios = require("axios");

exports.handler = async (event) => {
  try {
    const queryParams = event.queryStringParameters || {};
    const productName = queryParams.product || "iPhone 15";

    const sources = [
      { name: "Amazon", url: `https://api.example.com/amazon?query=${productName}` },
      { name: "Walmart", url: `https://api.example.com/walmart?query=${productName}` },
      { name: "eBay", url: `https://api.example.com/ebay?query=${productName}` }
    ];

    const results = await Promise.all(
      sources.map(async (site) => {
        try {
          // Simulated prices (replace later with actual API)
          const simulatedPrice = (Math.random() * 1000 + 100).toFixed(2);
          return { site: site.name, price: `$${simulatedPrice}` };
        } catch (err) {
          console.error(`Error fetching price from ${site.name}:`, err);
          return { site: site.name, price: "N/A" };
        }
      })
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        product: productName,
        prices: results,
      }),
    };
  } catch (error) {
    console.error("Error comparing prices:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to compare prices",
        error: error.message,
      }),
    };
  }
};
