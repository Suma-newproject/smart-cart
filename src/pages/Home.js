import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to SmartCart 🛍️</h1>
      <p>
        Search, compare, and manage your shopping cart with AWS-powered intelligence.
      </p>
      <p>Use the navigation bar to get started!</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
};
