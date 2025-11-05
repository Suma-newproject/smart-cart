import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Compare from "./pages/Compare";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} SmartCart — Built with React & AWS Lambda</p>
      </footer>
    </Router>
  );
}

export default App;
